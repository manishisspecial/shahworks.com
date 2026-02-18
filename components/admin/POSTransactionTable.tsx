"use client";

import {
  CheckCircle,
  XCircle,
  Clock,
  RefreshCw,
  CreditCard,
  Smartphone,
  Banknote,
  MoreHorizontal,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Eye,
  Inbox,
  Radio,
} from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import type { POSTransaction } from "@/app/api/pos/transactions/route";

interface POSTransactionTableProps {
  transactions: POSTransaction[];
  loading: boolean;
  onRefresh: () => void;
  onViewDetail?: (transaction: POSTransaction) => void;
}

type SortField = "timestamp" | "amount" | "status" | "merchantName";
type SortDirection = "asc" | "desc";

export default function POSTransactionTable({
  transactions,
  loading,
  onRefresh,
  onViewDetail,
}: POSTransactionTableProps) {
  const [sortField, setSortField] = useState<SortField>("timestamp");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedTransactions = [...transactions].sort((a, b) => {
    let aValue: string | number;
    let bValue: string | number;

    switch (sortField) {
      case "timestamp":
        aValue = new Date(a.timestamp).getTime();
        bValue = new Date(b.timestamp).getTime();
        break;
      case "amount":
        aValue = a.amount;
        bValue = b.amount;
        break;
      case "status":
        aValue = a.status;
        bValue = b.status;
        break;
      case "merchantName":
        aValue = a.merchantName.toLowerCase();
        bValue = b.merchantName.toLowerCase();
        break;
      default:
        return 0;
    }

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="w-4 h-4 text-emerald-400" />;
      case "failed":
        return <XCircle className="w-4 h-4 text-red-400" />;
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-400" />;
      case "refunded":
        return <RefreshCw className="w-4 h-4 text-blue-400" />;
      default:
        return null;
    }
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case "card":
        return <CreditCard className="w-3.5 h-3.5" />;
      case "upi":
        return <Smartphone className="w-3.5 h-3.5" />;
      case "nfc":
        return <Radio className="w-3.5 h-3.5" />;
      case "cash":
        return <Banknote className="w-3.5 h-3.5" />;
      default:
        return <MoreHorizontal className="w-3.5 h-3.5" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      success: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      failed: "bg-red-500/10 text-red-400 border-red-500/20",
      pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
      refunded: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    };
    return colors[status] || "bg-slate-500/10 text-slate-400 border-slate-500/20";
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ArrowUpDown className="w-3 h-3 text-slate-600" />;
    return sortDirection === "asc" ? (
      <ArrowUp className="w-3 h-3 text-violet-400" />
    ) : (
      <ArrowDown className="w-3 h-3 text-violet-400" />
    );
  };

  if (loading) {
    return (
      <div className="bg-slate-900/50 border border-white/[0.06] rounded-2xl overflow-hidden">
        <div className="flex flex-col items-center justify-center py-20">
          <div className="relative">
            <div className="w-12 h-12 rounded-full border-2 border-violet-500/20 border-t-violet-500 animate-spin" />
          </div>
          <p className="mt-4 text-sm text-slate-500">Loading transactions...</p>
        </div>
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="bg-slate-900/50 border border-white/[0.06] rounded-2xl overflow-hidden">
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-16 h-16 rounded-2xl bg-slate-800/50 flex items-center justify-center mb-4">
            <Inbox className="w-8 h-8 text-slate-600" />
          </div>
          <p className="text-sm font-medium text-slate-400">No transactions found</p>
          <p className="text-xs text-slate-600 mt-1">Try adjusting your filters</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/50 border border-white/[0.06] rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/[0.06]">
              <th className="px-5 py-3.5 text-left">
                <button
                  onClick={() => handleSort("timestamp")}
                  className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 uppercase tracking-wider hover:text-white transition-colors"
                >
                  Date & Time
                  <SortIcon field="timestamp" />
                </button>
              </th>
              <th className="px-5 py-3.5 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Transaction
              </th>
              <th className="px-5 py-3.5 text-left">
                <button
                  onClick={() => handleSort("merchantName")}
                  className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 uppercase tracking-wider hover:text-white transition-colors"
                >
                  Merchant
                  <SortIcon field="merchantName" />
                </button>
              </th>
              <th className="px-5 py-3.5 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Card / Settlement
              </th>
              <th className="px-5 py-3.5 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Method
              </th>
              <th className="px-5 py-3.5 text-right">
                <button
                  onClick={() => handleSort("amount")}
                  className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 uppercase tracking-wider hover:text-white transition-colors ml-auto"
                >
                  Amount
                  <SortIcon field="amount" />
                </button>
              </th>
              <th className="px-5 py-3.5 text-left">
                <button
                  onClick={() => handleSort("status")}
                  className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 uppercase tracking-wider hover:text-white transition-colors"
                >
                  Status
                  <SortIcon field="status" />
                </button>
              </th>
              <th className="px-5 py-3.5 text-center text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedTransactions.map((transaction, index) => (
              <motion.tr
                key={transaction.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
                className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors group cursor-pointer"
                onClick={() => onViewDetail?.(transaction)}
              >
                <td className="px-5 py-4">
                  <div className="text-sm text-slate-300">
                    {new Date(transaction.timestamp).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </div>
                  <div className="text-xs text-slate-600">
                    {new Date(transaction.timestamp).toLocaleTimeString("en-IN", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </td>
                <td className="px-5 py-4">
                  <div className="text-sm font-mono text-slate-300">
                    {transaction.transactionId}
                  </div>
                  <div className="text-[11px] text-slate-600 font-mono">
                    {transaction.referenceNumber}
                  </div>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500/20 to-blue-500/10 flex items-center justify-center text-[10px] font-bold text-violet-400 flex-shrink-0">
                      {transaction.merchantName.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-slate-300">
                        {transaction.merchantName}
                      </div>
                      <div className="text-[11px] text-slate-600">
                        {transaction.terminalId}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <div className="text-sm text-slate-300">
                    {transaction.cardBrand
                      ? `${transaction.cardBrand}${transaction.cardType ? ` (${transaction.cardType})` : ""}`
                      : "—"}
                  </div>
                  {transaction.settlementStatus && (
                    <div className="text-[11px] text-slate-600">
                      {transaction.settlementStatus}
                    </div>
                  )}
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-1.5 text-sm text-slate-400">
                    {getPaymentMethodIcon(transaction.paymentMethod)}
                    <span className="capitalize text-xs">{transaction.paymentMethod}</span>
                  </div>
                </td>
                <td className="px-5 py-4 text-right">
                  <span className="text-sm font-semibold text-white">
                    ₹{transaction.amount.toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-medium ${getStatusBadge(transaction.status)}`}>
                    {getStatusIcon(transaction.status)}
                    <span className="capitalize">{transaction.status}</span>
                  </div>
                </td>
                <td className="px-5 py-4 text-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onViewDetail?.(transaction);
                    }}
                    className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-slate-600 hover:text-violet-400 hover:bg-violet-500/10 transition-all opacity-0 group-hover:opacity-100"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-white/[0.06] flex items-center justify-between">
        <p className="text-xs text-slate-600">
          Showing <span className="text-slate-400 font-medium">{transactions.length}</span> transaction{transactions.length !== 1 ? "s" : ""}
        </p>
        <p className="text-xs text-slate-600">
          Powered by <span className="text-slate-400">Same Day Solutions</span>
        </p>
      </div>
    </div>
  );
}
