"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  CreditCard,
  Loader2,
  RefreshCw,
  AlertCircle,
  Search,
  X,
  Wifi,
  WifiOff,
  Wrench,
  Trash2,
  MapPin,
  Clock,
  Hash,
} from "lucide-react";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

interface POSMachine {
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

interface MachinesPagination {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
  has_next_page: boolean;
  has_prev_page: boolean;
}

export default function POSTerminalsPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAdminAuth();

  const [machines, setMachines] = useState<POSMachine[]>([]);
  const [pagination, setPagination] = useState<MachinesPagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.replace("/admin/login");
    }
  }, [isAuthenticated, authLoading, router]);

  const fetchMachines = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      params.append("page", String(currentPage));
      params.append("limit", "50");
      if (statusFilter) params.append("status", statusFilter);
      if (searchQuery) params.append("search", searchQuery);

      const response = await fetch(`/api/pos/machines?${params.toString()}`);
      const data = await response.json();

      if (data.success) {
        setMachines(data.data);
        setPagination(data.pagination);
      } else {
        setError(data.error || "Failed to fetch POS machines");
      }
    } catch (err) {
      setError("An error occurred while fetching POS machines");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [currentPage, statusFilter, searchQuery]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchMachines();
    }
  }, [fetchMachines, isAuthenticated]);

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "active":
        return {
          icon: Wifi,
          label: "Active",
          color: "text-emerald-400",
          bg: "bg-emerald-500/10 border-emerald-500/20",
          dot: "bg-emerald-400",
        };
      case "inactive":
        return {
          icon: WifiOff,
          label: "Inactive",
          color: "text-slate-400",
          bg: "bg-slate-500/10 border-slate-500/20",
          dot: "bg-slate-400",
        };
      case "maintenance":
        return {
          icon: Wrench,
          label: "Maintenance",
          color: "text-yellow-400",
          bg: "bg-yellow-500/10 border-yellow-500/20",
          dot: "bg-yellow-400",
        };
      case "decommissioned":
        return {
          icon: Trash2,
          label: "Decommissioned",
          color: "text-red-400",
          bg: "bg-red-500/10 border-red-500/20",
          dot: "bg-red-400",
        };
      default:
        return {
          icon: CreditCard,
          label: status,
          color: "text-slate-400",
          bg: "bg-slate-500/10 border-slate-500/20",
          dot: "bg-slate-400",
        };
    }
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <Loader2 className="w-8 h-8 animate-spin text-violet-500" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const activeCount = machines.filter((m) => m.status === "active").length;
  const inactiveCount = machines.filter((m) => m.status === "inactive").length;
  const maintenanceCount = machines.filter((m) => m.status === "maintenance").length;

  return (
    <div className="min-h-screen bg-slate-950">
      <AdminSidebar />
      <div className="lg:pl-[280px] min-h-screen flex flex-col">
        <AdminHeader />
        <main className="flex-1 p-4 lg:p-6 pb-24 lg:pb-6">
          {/* Page Title */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white">POS Terminals</h2>
                <p className="text-sm text-slate-500 mt-0.5">
                  Manage and monitor your assigned POS machines
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={fetchMachines}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-slate-400 bg-white/[0.04] border border-white/[0.06] hover:text-white hover:bg-white/[0.06] transition-all"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                Refresh
              </motion.button>
            </div>
          </motion.div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {[
              { label: "Active", count: activeCount, color: "from-emerald-500 to-teal-600", iconColor: "text-emerald-400", iconBg: "bg-emerald-500/20" },
              { label: "Inactive", count: inactiveCount, color: "from-slate-500 to-slate-600", iconColor: "text-slate-400", iconBg: "bg-slate-500/20" },
              { label: "Maintenance", count: maintenanceCount, color: "from-yellow-500 to-orange-600", iconColor: "text-yellow-400", iconBg: "bg-yellow-500/20" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative overflow-hidden bg-slate-900/50 border border-white/[0.06] rounded-2xl p-5 hover:border-white/[0.1] transition-all group"
              >
                <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${stat.color} rounded-full opacity-0 group-hover:opacity-[0.07] blur-3xl transition-opacity duration-500`} />
                <div className="relative flex items-start justify-between">
                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{stat.label}</p>
                    <p className="text-2xl font-bold text-white mt-1">{loading ? "—" : stat.count}</p>
                  </div>
                  <div className={`p-2.5 rounded-xl ${stat.iconBg}`}>
                    <CreditCard className={`w-5 h-5 ${stat.iconColor}`} />
                  </div>
                </div>
                <div className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r ${stat.color} opacity-40`} />
              </motion.div>
            ))}
          </div>

          {/* Search & Filters */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-slate-900/50 border border-white/[0.06] rounded-2xl p-4 mb-6"
          >
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative flex-1 min-w-[200px] group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-violet-400 transition-colors" />
                <input
                  type="text"
                  placeholder="Search by terminal ID, serial, model..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white/[0.04] border border-white/[0.06] rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-white focus:outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 transition-all"
              >
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="maintenance">Maintenance</option>
                <option value="decommissioned">Decommissioned</option>
              </select>
            </div>
          </motion.div>

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

          {/* Machines Table / Grid */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {loading ? (
              <div className="bg-slate-900/50 border border-white/[0.06] rounded-2xl overflow-hidden">
                <div className="flex flex-col items-center justify-center py-20">
                  <div className="w-12 h-12 rounded-full border-2 border-violet-500/20 border-t-violet-500 animate-spin" />
                  <p className="mt-4 text-sm text-slate-500">Loading POS machines...</p>
                </div>
              </div>
            ) : machines.length === 0 ? (
              <div className="bg-slate-900/50 border border-white/[0.06] rounded-2xl overflow-hidden">
                <div className="flex flex-col items-center justify-center py-20">
                  <div className="w-16 h-16 rounded-2xl bg-slate-800/50 flex items-center justify-center mb-4">
                    <CreditCard className="w-8 h-8 text-slate-600" />
                  </div>
                  <p className="text-sm font-medium text-slate-400">No POS machines found</p>
                  <p className="text-xs text-slate-600 mt-1">
                    {searchQuery || statusFilter
                      ? "Try adjusting your filters"
                      : "No machines have been assigned to your account yet"}
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {machines.map((machine, index) => {
                  const statusConfig = getStatusConfig(machine.status);
                  const StatusIcon = statusConfig.icon;
                  return (
                    <motion.div
                      key={machine.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-slate-900/50 border border-white/[0.06] rounded-2xl p-5 hover:border-white/[0.12] transition-all group"
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500/20 to-blue-500/10 flex items-center justify-center">
                            <CreditCard className="w-5 h-5 text-violet-400" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-white">{machine.machine_model}</p>
                            <p className="text-xs text-slate-500 font-mono">TID: {machine.terminal_id}</p>
                          </div>
                        </div>
                        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-medium ${statusConfig.bg}`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${statusConfig.dot}`} />
                          <span className={statusConfig.color}>{statusConfig.label}</span>
                        </div>
                      </div>

                      {/* Details */}
                      <div className="space-y-2.5">
                        <div className="flex items-center gap-2 text-xs">
                          <Hash className="w-3.5 h-3.5 text-slate-600" />
                          <span className="text-slate-500">Serial:</span>
                          <span className="text-slate-300 font-mono">{machine.device_serial}</span>
                        </div>

                        {machine.retailer_name && (
                          <div className="flex items-center gap-2 text-xs">
                            <CreditCard className="w-3.5 h-3.5 text-slate-600" />
                            <span className="text-slate-500">Retailer:</span>
                            <span className="text-slate-300">{machine.retailer_name}</span>
                          </div>
                        )}

                        {machine.retailer_business_name && (
                          <div className="flex items-center gap-2 text-xs">
                            <CreditCard className="w-3.5 h-3.5 text-slate-600" />
                            <span className="text-slate-500">Business:</span>
                            <span className="text-slate-300 truncate">{machine.retailer_business_name}</span>
                          </div>
                        )}

                        {(machine.retailer_city || machine.retailer_state) && (
                          <div className="flex items-center gap-2 text-xs">
                            <MapPin className="w-3.5 h-3.5 text-slate-600" />
                            <span className="text-slate-500">Location:</span>
                            <span className="text-slate-300 capitalize">
                              {[machine.retailer_city, machine.retailer_state]
                                .filter(Boolean)
                                .join(", ")}
                            </span>
                          </div>
                        )}

                        <div className="flex items-center gap-2 text-xs">
                          <Clock className="w-3.5 h-3.5 text-slate-600" />
                          <span className="text-slate-500">Last Txn:</span>
                          <span className="text-slate-300">{formatDate(machine.last_txn_at)}</span>
                        </div>

                        {machine.activated_at && (
                          <div className="flex items-center gap-2 text-xs">
                            <Clock className="w-3.5 h-3.5 text-slate-600" />
                            <span className="text-slate-500">Activated:</span>
                            <span className="text-slate-300">{formatDate(machine.activated_at)}</span>
                          </div>
                        )}

                        {machine.retailer_code && (
                          <div className="flex items-center gap-2 text-xs">
                            <Hash className="w-3.5 h-3.5 text-slate-600" />
                            <span className="text-slate-500">Retailer Code:</span>
                            <span className="text-slate-300 font-mono">{machine.retailer_code}</span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </motion.div>

          {/* Pagination */}
          {pagination && pagination.total_pages > 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-between mt-6"
            >
              <p className="text-xs text-slate-500">
                Page {pagination.page} of {pagination.total_pages} ({pagination.total} machines)
              </p>
              <div className="flex items-center gap-2">
                <button
                  disabled={!pagination.has_prev_page}
                  onClick={() => setCurrentPage((p) => p - 1)}
                  className="px-3 py-1.5 text-xs font-medium text-slate-400 bg-white/[0.04] border border-white/[0.06] rounded-lg hover:text-white hover:bg-white/[0.06] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  Previous
                </button>
                <button
                  disabled={!pagination.has_next_page}
                  onClick={() => setCurrentPage((p) => p + 1)}
                  className="px-3 py-1.5 text-xs font-medium text-slate-400 bg-white/[0.04] border border-white/[0.06] rounded-lg hover:text-white hover:bg-white/[0.06] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  Next
                </button>
              </div>
            </motion.div>
          )}

          {/* Footer */}
          {!loading && machines.length > 0 && (
            <div className="mt-4 text-center">
              <p className="text-xs text-slate-600">
                Showing <span className="text-slate-400 font-medium">{machines.length}</span> machine{machines.length !== 1 ? "s" : ""} · Powered by <span className="text-slate-400">Same Day Solutions</span>
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
