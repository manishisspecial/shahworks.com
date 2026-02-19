"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Download,
  RefreshCw,
  AlertCircle,
  Loader2,
  CheckCircle,
  TestTube,
  X,
} from "lucide-react";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import POSTransactionTable from "@/components/admin/POSTransactionTable";
import TransactionStats from "@/components/admin/TransactionStats";
import TransactionFilters from "@/components/admin/TransactionFilters";
import TransactionDetailModal from "@/components/admin/TransactionDetailModal";
import type { POSTransaction } from "@/app/api/pos/transactions/route";

interface TransactionSummary {
  totalAmount: number;
  totalAmountRupees?: string;
  totalTransactions: number;
  successCount: number;
  failedCount: number;
  refundedCount: number;
  authorizedCount?: number;
  capturedAmountRupees?: string;
  terminalCount?: number;
}

export default function AdminDashboard() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAdminAuth();

  const [transactions, setTransactions] = useState<POSTransaction[]>([]);
  const [summary, setSummary] = useState<TransactionSummary>({
    totalAmount: 0,
    totalTransactions: 0,
    successCount: 0,
    failedCount: 0,
    refundedCount: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Initialize filters with default date range (last 30 days)
  const getDefaultDates = () => {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);
    return {
      startDate: startDate.toISOString().split("T")[0],
      endDate: endDate.toISOString().split("T")[0],
    };
  };

  const [filters, setFilters] = useState(() => {
    const defaultDates = getDefaultDates();
    return {
      startDate: defaultDates.startDate,
      endDate: defaultDates.endDate,
      status: "",
      paymentMethod: "",
      merchantName: "",
      search: "",
    };
  });
  const [selectedTransaction, setSelectedTransaction] = useState<POSTransaction | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportStatus, setExportStatus] = useState<string | null>(null);
  const [testResult, setTestResult] = useState<any>(null);
  const [isTesting, setIsTesting] = useState(false);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.replace("/admin/login");
    }
  }, [isAuthenticated, authLoading, router]);

  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Ensure we have date range (use defaults if missing)
      const defaultDates = getDefaultDates();
      const startDate = filters.startDate || defaultDates.startDate;
      const endDate = filters.endDate || defaultDates.endDate;

      const params = new URLSearchParams();
      params.append("startDate", startDate);
      params.append("endDate", endDate);
      if (filters.status) params.append("status", filters.status);
      if (filters.paymentMethod) params.append("paymentMethod", filters.paymentMethod);
      if (filters.merchantName) params.append("merchantName", filters.merchantName);
      if (filters.search) params.append("search", filters.search);

      const response = await fetch(`/api/pos/transactions?${params.toString()}`);
      const data = await response.json();

      if (data.success) {
        setTransactions(data.data);
        setSummary(data.summary);
      } else {
        setError(data.error || "Failed to fetch transactions");
      }
    } catch (err) {
      setError("An error occurred while fetching transactions");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchTransactions();
    }
  }, [fetchTransactions, isAuthenticated]);

  const handleDownload = async () => {
    setIsExporting(true);
    setExportStatus("Creating export job...");

    try {
      // Prepare date range (use filter dates or default to last 30 days)
      const endDate = filters.endDate || new Date().toISOString().split("T")[0];
      const startDate = filters.startDate || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

      // Map our status to API status
      const statusMap: Record<string, string | null> = {
        success: "CAPTURED",
        failed: "FAILED",
        pending: "AUTHORIZED",
        refunded: "REFUNDED",
      };

      // Create export job
      const exportResponse = await fetch("/api/pos/export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          format: "csv",
          date_from: startDate,
          date_to: endDate,
          status: filters.status ? statusMap[filters.status] || null : null,
          terminal_id: null,
        }),
      });

      if (!exportResponse.ok) {
        const error = await exportResponse.json();
        throw new Error(error.error || "Failed to create export job");
      }

      const exportData = await exportResponse.json();
      const jobId = exportData.data.job_id;

      setExportStatus("Processing export...");

      // Poll for export status
      const pollInterval = setInterval(async () => {
        try {
          const statusResponse = await fetch(`/api/pos/export?jobId=${jobId}`);
          const statusData = await statusResponse.json();

          if (statusData.data.job.status === "COMPLETED") {
            clearInterval(pollInterval);
            setExportStatus("Downloading...");

            // Download the file
            if (statusData.data.job.file_url) {
              window.open(statusData.data.job.file_url, "_blank");
              setExportStatus("Export completed!");
              setTimeout(() => {
                setIsExporting(false);
                setExportStatus(null);
              }, 2000);
            } else {
              throw new Error("Export completed but no file URL provided");
            }
          } else if (statusData.data.job.status === "FAILED") {
            clearInterval(pollInterval);
            throw new Error("Export job failed");
          } else {
            // Still processing
            setExportStatus(`Processing... (${statusData.data.job.status})`);
          }
        } catch (err: any) {
          clearInterval(pollInterval);
          setError(err.message || "Failed to check export status");
          setIsExporting(false);
          setExportStatus(null);
        }
      }, 2000); // Poll every 2 seconds

      // Timeout after 60 seconds
      setTimeout(() => {
        clearInterval(pollInterval);
        if (isExporting) {
          setError("Export timeout. Please try again.");
          setIsExporting(false);
          setExportStatus(null);
        }
      }, 60000);
    } catch (err: any) {
      setError(err.message || "Failed to create export");
      setIsExporting(false);
      setExportStatus(null);
    }
  };

  const handleViewDetail = (transaction: POSTransaction) => {
    setSelectedTransaction(transaction);
    setIsDetailOpen(true);
  };

  const handleTestAPI = async () => {
    setIsTesting(true);
    setTestResult(null);
    setError(null);
    try {
      const response = await fetch("/api/pos/test");
      const data = await response.json();
      setTestResult(data);
      if (data.success) {
        // If test succeeds, refresh transactions
        fetchTransactions();
      }
    } catch (err: any) {
      setTestResult({
        success: false,
        error: err.message || "Failed to test API",
      });
    } finally {
      setIsTesting(false);
    }
  };

  // Loading state
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <Loader2 className="w-8 h-8 animate-spin text-violet-500" />
      </div>
    );
  }

  // Not authenticated
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div className="lg:pl-[280px] min-h-screen flex flex-col">
        {/* Header */}
        <AdminHeader />

        {/* Dashboard Content */}
        <main className="flex-1 p-4 lg:p-6 pb-24 lg:pb-6">
          {/* Page Title */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white">
                  Transaction Overview
                </h2>
                <p className="text-sm text-slate-500 mt-0.5">
                  Real-time POS transaction monitoring
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleTestAPI}
                  disabled={isTesting}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-slate-400 bg-white/[0.04] border border-white/[0.06] hover:text-white hover:bg-white/[0.06] transition-all disabled:opacity-50"
                  title="Test API Connection"
                >
                  <TestTube className={`w-4 h-4 ${isTesting ? "animate-pulse" : ""}`} />
                  Test API
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={fetchTransactions}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-slate-400 bg-white/[0.04] border border-white/[0.06] hover:text-white hover:bg-white/[0.06] transition-all"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                  Refresh
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleDownload}
                  disabled={transactions.length === 0 || isExporting}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 shadow-lg shadow-violet-500/20 disabled:opacity-40 disabled:cursor-not-allowed transition-all relative"
                >
                  {isExporting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {exportStatus || "Exporting..."}
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      Export CSV
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <TransactionStats summary={summary} loading={loading} />

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-slate-900/50 border border-white/[0.06] rounded-2xl p-4 mb-6"
          >
            <TransactionFilters filters={filters} setFilters={setFilters} />
          </motion.div>

          {/* Test Result */}
          {testResult && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-6 rounded-xl border p-4 ${
                testResult.success
                  ? "bg-emerald-500/10 border-emerald-500/20"
                  : "bg-red-500/10 border-red-500/20"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1">
                  {testResult.success ? (
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <p
                      className={`font-medium mb-1 ${
                        testResult.success ? "text-emerald-400" : "text-red-400"
                      }`}
                    >
                      {testResult.message || (testResult.success ? "API Test Successful!" : "API Test Failed")}
                    </p>
                    {testResult.success && testResult.results && (
                      <div className="text-xs text-slate-400 space-y-1 mt-2">
                        {testResult.results.healthCheck && (
                          <p>{testResult.results.healthCheck.status?.includes("✅") ? "✅" : "❌"} Health Check: {testResult.results.healthCheck.status?.includes("✅") ? "Passed" : "Failed"}</p>
                        )}
                        {testResult.results.transactions && (
                          <>
                            <p>{testResult.results.transactions.status?.includes("✅") ? "✅" : "❌"} Transactions API: {testResult.results.transactions.apiConnected ? "Connected" : "Failed"}</p>
                            {testResult.results.transactions.totalRecords !== undefined && (
                              <p>📊 Total Records: {testResult.results.transactions.totalRecords}</p>
                            )}
                          </>
                        )}
                        {testResult.results.machines && (
                          <>
                            <p>{testResult.results.machines.status?.includes("✅") ? "✅" : "❌"} POS Machines API: {testResult.results.machines.apiConnected ? "Connected" : "Failed"}</p>
                            {testResult.results.machines.totalMachines !== undefined && (
                              <p>🖥️ Total Machines: {testResult.results.machines.totalMachines}</p>
                            )}
                          </>
                        )}
                      </div>
                    )}
                    {!testResult.success && testResult.possibleIssues && (
                      <div className="text-xs text-slate-400 space-y-1 mt-2">
                        <p className="font-medium text-slate-300 mb-1">Possible Issues:</p>
                        <ul className="list-disc list-inside space-y-0.5">
                          {testResult.possibleIssues.map((issue: string, idx: number) => (
                            <li key={idx}>{issue}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {testResult.error && (
                      <p className="text-xs text-slate-500 mt-2">Error: {testResult.error}</p>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setTestResult(null)}
                  className="text-slate-500 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400"
            >
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </motion.div>
          )}

          {/* Transactions Table */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <POSTransactionTable
              transactions={transactions}
              loading={loading}
              onRefresh={fetchTransactions}
              onViewDetail={handleViewDetail}
            />
          </motion.div>
        </main>
      </div>

      {/* Transaction Detail Modal */}
      <TransactionDetailModal
        transaction={selectedTransaction}
        isOpen={isDetailOpen}
        onClose={() => {
          setIsDetailOpen(false);
          setSelectedTransaction(null);
        }}
      />
    </div>
  );
}
