"use client";

import { motion } from "framer-motion";
import { IndianRupee, TrendingUp, CheckCircle, XCircle, RotateCcw } from "lucide-react";

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

interface TransactionStatsProps {
  summary: TransactionSummary;
  loading: boolean;
}

export default function TransactionStats({ summary, loading }: TransactionStatsProps) {
  const stats = [
    {
      label: "Total Revenue",
      value: `₹${summary.totalAmount.toLocaleString("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
      icon: IndianRupee,
      gradient: "from-emerald-500 to-teal-600",
      shadowColor: "shadow-emerald-500/20",
      iconBg: "bg-emerald-500/20",
      iconColor: "text-emerald-400",
      change: "+12.5%",
      changeColor: "text-emerald-400",
    },
    {
      label: "Total Transactions",
      value: summary.totalTransactions.toLocaleString(),
      icon: TrendingUp,
      gradient: "from-violet-500 to-purple-600",
      shadowColor: "shadow-violet-500/20",
      iconBg: "bg-violet-500/20",
      iconColor: "text-violet-400",
      change: "+8.2%",
      changeColor: "text-violet-400",
    },
    {
      label: "Successful",
      value: summary.successCount.toLocaleString(),
      icon: CheckCircle,
      gradient: "from-blue-500 to-cyan-600",
      shadowColor: "shadow-blue-500/20",
      iconBg: "bg-blue-500/20",
      iconColor: "text-blue-400",
      change: `${summary.totalTransactions > 0 ? ((summary.successCount / summary.totalTransactions) * 100).toFixed(1) : 0}%`,
      changeColor: "text-blue-400",
    },
    {
      label: "Failed",
      value: summary.failedCount.toLocaleString(),
      icon: XCircle,
      gradient: "from-rose-500 to-pink-600",
      shadowColor: "shadow-rose-500/20",
      iconBg: "bg-rose-500/20",
      iconColor: "text-rose-400",
      change: `${summary.totalTransactions > 0 ? ((summary.failedCount / summary.totalTransactions) * 100).toFixed(1) : 0}%`,
      changeColor: "text-rose-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={`relative overflow-hidden bg-slate-900/50 border border-white/[0.06] rounded-2xl p-5 hover:border-white/[0.1] transition-all duration-300 group`}>
              {/* Gradient glow on hover */}
              <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${stat.gradient} rounded-full opacity-0 group-hover:opacity-[0.07] blur-3xl transition-opacity duration-500`} />

              <div className="relative flex items-start justify-between">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                    {stat.label}
                  </p>
                  {loading ? (
                    <div className="flex items-center gap-2 mt-2">
                      <RotateCcw className="w-4 h-4 animate-spin text-slate-600" />
                      <div className="h-7 w-24 bg-slate-800 rounded-lg animate-pulse" />
                    </div>
                  ) : (
                    <p className="text-2xl font-bold text-white mt-1">
                      {stat.value}
                    </p>
                  )}
                  {!loading && (
                    <p className={`text-xs font-medium ${stat.changeColor} mt-1`}>
                      {stat.change}
                    </p>
                  )}
                </div>
                <div className={`p-2.5 rounded-xl ${stat.iconBg}`}>
                  <Icon className={`w-5 h-5 ${stat.iconColor}`} />
                </div>
              </div>

              {/* Bottom gradient bar */}
              <div className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r ${stat.gradient} opacity-40`} />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
