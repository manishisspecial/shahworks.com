import { NextRequest, NextResponse } from "next/server";
import {
  fetchPOSTransactions,
  mapAPITransactionToInternal,
  type APITransactionsResponse,
} from "@/lib/pos-api";

// Type definitions for POS transactions (matching frontend)
export interface POSTransaction {
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
}

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const status = searchParams.get("status");
    const paymentMethod = searchParams.get("paymentMethod");
    const terminalId = searchParams.get("terminalId");
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(searchParams.get("pageSize") || "50");

    // Validate date range (required by API)
    if (!startDate || !endDate) {
      return NextResponse.json({
        success: true,
        data: [],
        pagination: {
          page: 1,
          page_size: 50,
          total_records: 0,
          total_pages: 0,
          has_next: false,
          has_prev: false,
        },
        summary: {
          totalAmount: 0,
          totalAmountRupees: "0.00",
          totalTransactions: 0,
          successCount: 0,
          failedCount: 0,
          refundedCount: 0,
          authorizedCount: 0,
          capturedAmountRupees: "0.00",
          terminalCount: 0,
        },
        message: "Please provide date range (startDate and endDate)",
      });
    }

    // Map our status to API status
    const statusMap: Record<string, string | null> = {
      success: "CAPTURED",
      failed: "FAILED",
      pending: "AUTHORIZED",
      refunded: "REFUNDED",
    };

    // Map payment method to API payment_mode
    const paymentModeMap: Record<string, string | null> = {
      card: "CARD",
      upi: "UPI",
      nfc: "NFC",
      cash: null, // Cash not supported by API
      other: null,
    };

    // Prepare API request parameters
    const apiParams = {
      date_from: new Date(startDate).toISOString(),
      date_to: new Date(endDate + "T23:59:59.999Z").toISOString(),
      status: status ? statusMap[status] || null : null,
      terminal_id: terminalId || null,
      payment_mode: paymentMethod ? paymentModeMap[paymentMethod] || null : null,
      settlement_status: null,
      page,
      page_size: pageSize,
    };

    // Fetch from API
    let apiResponse: APITransactionsResponse;
    try {
      apiResponse = await fetchPOSTransactions(apiParams);
    } catch (error: any) {
      console.error("POS API Error:", error);
      return NextResponse.json(
        {
          success: false,
          error: error.message || "Failed to fetch transactions from POS API",
        },
        { status: 500 }
      );
    }

    // Map API transactions to our format
    let transactions = apiResponse.data.map(mapAPITransactionToInternal);

    // Client-side filtering for search (since API doesn't support text search)
    if (search) {
      const searchLower = search.toLowerCase();
      transactions = transactions.filter(
        (txn) =>
          txn.transactionId.toLowerCase().includes(searchLower) ||
          txn.referenceNumber.toLowerCase().includes(searchLower) ||
          txn.terminalId.toLowerCase().includes(searchLower) ||
          txn.merchantName.toLowerCase().includes(searchLower) ||
          txn.externalRef?.toLowerCase().includes(searchLower) ||
          txn.retailerCode?.toLowerCase().includes(searchLower) ||
          txn.retailerName?.toLowerCase().includes(searchLower)
      );
    }

    // Build summary from updated API fields
    const summary = {
      totalAmount: apiResponse.summary.total_amount_paisa / 100,
      totalAmountRupees: apiResponse.summary.total_amount_rupees,
      totalTransactions: apiResponse.summary.total_transactions,
      successCount: apiResponse.summary.captured_count,
      failedCount: apiResponse.summary.failed_count,
      refundedCount: apiResponse.summary.refunded_count,
      authorizedCount: apiResponse.summary.authorized_count,
      capturedAmountRupees: apiResponse.summary.captured_amount_rupees,
      terminalCount: apiResponse.summary.terminal_count,
    };

    return NextResponse.json({
      success: true,
      data: transactions,
      pagination: apiResponse.pagination,
      summary,
    });
  } catch (error: any) {
    console.error("Error fetching transactions:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to fetch transactions",
      },
      { status: 500 }
    );
  }
}
