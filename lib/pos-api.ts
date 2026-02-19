import CryptoJS from "crypto-js";

// API Configuration
const API_BASE_URL = process.env.SAME_DAY_SOLUTIONS_API_URL || "https://api.samedaysolution.in";
const API_KEY = process.env.SAME_DAY_SOLUTIONS_API_KEY || "";
const API_SECRET = process.env.SAME_DAY_SOLUTIONS_API_SECRET || "";

// ─── API Response Types ────────────────────────────────────────────────

export interface APITransaction {
  id: string;
  razorpay_txn_id: string;
  external_ref?: string;
  terminal_id: string;
  amount: number; // in paise
  status: "AUTHORIZED" | "CAPTURED" | "FAILED" | "REFUNDED" | "VOIDED";
  rrn?: string;
  card_brand?: string;
  card_type?: string;
  payment_mode: "CARD" | "UPI" | "NFC";
  settlement_status?: "PENDING" | "SETTLED" | "FAILED";
  device_serial?: string;
  txn_time: string;
  created_at: string;
  retailer_code?: string;
  retailer_name?: string;
}

export interface APITransactionsResponse {
  success: boolean;
  data: APITransaction[];
  pagination: {
    page: number;
    page_size: number;
    total_records: number;
    total_pages: number;
    has_next: boolean;
    has_prev: boolean;
  };
  summary: {
    total_transactions: number;
    total_amount_paisa: number;
    total_amount_rupees: string;
    authorized_count: number;
    captured_count: number;
    failed_count: number;
    refunded_count: number;
    captured_amount_paisa: number;
    captured_amount_rupees: string;
    terminal_count: number;
  };
}

export interface APIMachine {
  id: string;
  terminal_id: string;
  device_serial: string;
  machine_model: string;
  status: "active" | "inactive" | "maintenance" | "decommissioned";
  activated_at: string | null;
  last_txn_at: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  retailer_code: string | null;
  retailer_name: string | null;
  retailer_business_name: string | null;
  retailer_city: string | null;
  retailer_state: string | null;
}

export interface APIMachinesResponse {
  success: boolean;
  data: APIMachine[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
    has_next_page: boolean;
    has_prev_page: boolean;
  };
}

export interface APIExportJobResponse {
  success: boolean;
  data: {
    message: string;
    job_id: string;
    format: string;
    status: "QUEUED" | "PROCESSING" | "COMPLETED" | "FAILED";
    remaining_exports_today?: number;
  };
}

export interface APIExportStatusResponse {
  success: boolean;
  data: {
    job: {
      id: string;
      status: "QUEUED" | "PROCESSING" | "COMPLETED" | "FAILED";
      format: string;
      file_url: string | null;
      file_size_bytes?: number;
      record_count?: number;
      created_at: string;
      completed_at: string | null;
      expires_at?: string;
    };
  };
}

export interface APIHealthResponse {
  status: string;
  service: string;
  version?: string;
  timestamp: string;
  uptime?: number;
  database?: {
    status: string;
    latency_ms?: number;
  };
}

// ─── Signature & Auth ──────────────────────────────────────────────────

/**
 * Generate HMAC-SHA256 signature for API authentication.
 * Formula: HMAC_SHA256(api_secret, JSON.stringify(body) + timestamp)
 * For GET requests (no body): HMAC_SHA256(api_secret, '' + timestamp)
 */
function generateSignature(body: string, timestamp: string, apiSecret: string): string {
  const signaturePayload = body + timestamp;
  return CryptoJS.HmacSHA256(signaturePayload, apiSecret).toString(CryptoJS.enc.Hex);
}

/**
 * Make authenticated API request to Same Day Solutions POS API
 */
async function makeAuthenticatedRequest(
  endpoint: string,
  method: "GET" | "POST",
  body?: Record<string, unknown>
): Promise<any> {
  if (!API_KEY || !API_SECRET) {
    throw new Error(
      "API credentials not configured. Please set SAME_DAY_SOLUTIONS_API_KEY and SAME_DAY_SOLUTIONS_API_SECRET environment variables."
    );
  }

  const timestamp = Date.now().toString();
  const bodyString = body ? JSON.stringify(body) : "";
  const signature = generateSignature(bodyString, timestamp, API_SECRET);

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    "x-api-key": API_KEY,
    "x-signature": signature,
    "x-timestamp": timestamp,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.error?.message || `API request failed: ${response.status} ${response.statusText}`
    );
  }

  return await response.json();
}

// ─── Public (Unauthenticated) ──────────────────────────────────────────

/**
 * Health check — no authentication required
 */
export async function checkHealth(): Promise<APIHealthResponse> {
  const response = await fetch(`${API_BASE_URL}/pos-health`);
  if (!response.ok) {
    throw new Error(`Health check failed: ${response.status}`);
  }
  return await response.json();
}

// ─── Partner Authenticated APIs ────────────────────────────────────────

/**
 * Fetch POS transactions from Same Day Solutions API
 */
export async function fetchPOSTransactions(params: {
  date_from: string;
  date_to: string;
  status?: string | null;
  terminal_id?: string | null;
  payment_mode?: string | null;
  settlement_status?: string | null;
  page?: number;
  page_size?: number;
}): Promise<APITransactionsResponse> {
  const requestBody: Record<string, unknown> = {
    date_from: params.date_from,
    date_to: params.date_to,
    status: params.status || null,
    terminal_id: params.terminal_id || null,
    payment_mode: params.payment_mode || null,
    settlement_status: params.settlement_status || null,
    page: params.page || 1,
    page_size: params.page_size || 50,
  };

  return await makeAuthenticatedRequest(
    "/api/partner/pos-transactions",
    "POST",
    requestBody
  );
}

/**
 * Fetch assigned POS machines from Same Day Solutions API
 */
export async function fetchPOSMachines(params?: {
  page?: number;
  limit?: number;
  status?: string | null;
  machine_type?: string | null;
  search?: string | null;
}): Promise<APIMachinesResponse> {
  const queryParams = new URLSearchParams();
  queryParams.append("page", String(params?.page || 1));
  queryParams.append("limit", String(params?.limit || 50));
  if (params?.status) queryParams.append("status", params.status);
  if (params?.machine_type) queryParams.append("machine_type", params.machine_type);
  if (params?.search) queryParams.append("search", params.search);

  return await makeAuthenticatedRequest(
    `/api/partner/pos-machines?${queryParams.toString()}`,
    "GET"
  );
}

/**
 * Create export job
 */
export async function createExportJob(params: {
  format: "csv" | "excel" | "pdf" | "zip";
  date_from: string;
  date_to: string;
  status?: string | null;
  terminal_id?: string | null;
}): Promise<APIExportJobResponse> {
  const requestBody: Record<string, unknown> = {
    format: params.format,
    date_from: params.date_from,
    date_to: params.date_to,
    status: params.status || null,
    terminal_id: params.terminal_id || null,
  };

  return await makeAuthenticatedRequest(
    "/api/partner/pos-transactions/export",
    "POST",
    requestBody
  );
}

/**
 * Check export job status
 */
export async function checkExportStatus(jobId: string): Promise<APIExportStatusResponse> {
  return await makeAuthenticatedRequest(
    `/api/partner/export-status/${jobId}`,
    "GET"
  );
}

// ─── Mappers ───────────────────────────────────────────────────────────

/**
 * Map API transaction to our internal transaction format
 */
export function mapAPITransactionToInternal(apiTxn: APITransaction): {
  id: string;
  transactionId: string;
  externalRef: string;
  amount: number;
  currency: string;
  status: "success" | "failed" | "pending" | "refunded";
  paymentMethod: "card" | "upi" | "nfc" | "other";
  merchantName: string;
  terminalId: string;
  timestamp: string;
  referenceNumber: string;
  cardBrand?: string;
  cardType?: string;
  settlementStatus?: string;
  deviceSerial?: string;
  retailerCode?: string;
  retailerName?: string;
  description?: string;
} {
  // Map API status to our status
  const statusMap: Record<string, "success" | "failed" | "pending" | "refunded"> = {
    AUTHORIZED: "pending",
    CAPTURED: "success",
    FAILED: "failed",
    REFUNDED: "refunded",
    VOIDED: "failed",
  };

  // Map payment mode
  const paymentModeMap: Record<string, "card" | "upi" | "nfc" | "other"> = {
    CARD: "card",
    UPI: "upi",
    NFC: "nfc",
  };

  // Handle amount conversion: API may return in paise or rupees
  // Based on user feedback, API seems to return amounts in rupees (not paise)
  // Check: if amount is a small number (< 1000) and looks like rupees, use as-is
  // Otherwise, if it's a large number (>= 1000), it's likely in paise, so divide by 100
  // For transactions, amounts are typically >= 1 rupee, so if we get 18, it's 18 rupees, not 1800 paise
  const amountInRupees = apiTxn.amount >= 1000 ? apiTxn.amount / 100 : apiTxn.amount;

  // Determine status: CAPTURED = success, AUTHORIZED = pending
  // If status is AUTHORIZED but settlement_status is SETTLED, treat as success
  // Make status mapping case-insensitive to handle any variations
  const statusUpper = apiTxn.status.toUpperCase();
  let mappedStatus = statusMap[statusUpper] || "pending";
  
  // If status is AUTHORIZED but settlement_status is SETTLED, treat as success
  if (statusUpper === "AUTHORIZED" && apiTxn.settlement_status?.toUpperCase() === "SETTLED") {
    mappedStatus = "success";
  }
  
  // Also check if the status might be "SUCCESS" or similar (handle edge cases)
  if (statusUpper.includes("SUCCESS") || statusUpper.includes("COMPLETED")) {
    mappedStatus = "success";
  }

  return {
    id: apiTxn.id,
    transactionId: apiTxn.razorpay_txn_id,
    externalRef: apiTxn.external_ref || "",
    amount: amountInRupees,
    currency: "INR",
    status: mappedStatus,
    paymentMethod: paymentModeMap[apiTxn.payment_mode] || "other",
    merchantName: apiTxn.retailer_name || `Terminal ${apiTxn.terminal_id}`,
    terminalId: apiTxn.terminal_id,
    timestamp: apiTxn.txn_time || apiTxn.created_at,
    referenceNumber: apiTxn.rrn || apiTxn.razorpay_txn_id,
    cardBrand: apiTxn.card_brand,
    cardType: apiTxn.card_type,
    settlementStatus: apiTxn.settlement_status,
    deviceSerial: apiTxn.device_serial,
    retailerCode: apiTxn.retailer_code,
    retailerName: apiTxn.retailer_name,
    description: apiTxn.card_brand
      ? `${apiTxn.card_type || ""} ${apiTxn.card_brand}`.trim()
      : undefined,
  };
}
