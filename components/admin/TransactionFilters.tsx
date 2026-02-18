"use client";

import { Search, SlidersHorizontal, X, Calendar } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Filters {
  startDate: string;
  endDate: string;
  status: string;
  paymentMethod: string;
  merchantName: string;
  search: string;
}

interface TransactionFiltersProps {
  filters: Filters;
  setFilters: (filters: Filters) => void;
}

export default function TransactionFilters({
  filters,
  setFilters,
}: TransactionFiltersProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const updateFilter = (key: keyof Filters, value: string) => {
    setFilters({ ...filters, [key]: value });
  };

  const hasActiveFilters =
    filters.startDate ||
    filters.endDate ||
    filters.status ||
    filters.paymentMethod ||
    filters.merchantName;

  const clearAll = () => {
    setFilters({
      startDate: "",
      endDate: "",
      status: "",
      paymentMethod: "",
      merchantName: "",
      search: "",
    });
  };

  const inputClass =
    "px-3 py-2 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 transition-all";

  return (
    <div className="w-full space-y-3">
      {/* Search Bar */}
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-violet-400 transition-colors" />
        <input
          type="text"
          placeholder="Search by transaction ID, reference, customer..."
          value={filters.search}
          onChange={(e) => updateFilter("search", e.target.value)}
          className="w-full pl-11 pr-4 py-2.5 bg-white/[0.04] border border-white/[0.06] rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 transition-all"
        />
        {filters.search && (
          <button
            onClick={() => updateFilter("search", "")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Filter Toggle */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-all duration-200 border ${
            showAdvanced
              ? "bg-violet-500/10 border-violet-500/20 text-violet-400"
              : "bg-white/[0.02] border-white/[0.06] text-slate-400 hover:text-white hover:bg-white/[0.04]"
          }`}
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          Filters
          {hasActiveFilters && (
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
          )}
        </button>

        {hasActiveFilters && (
          <button
            onClick={clearAll}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-500 hover:text-white bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] transition-all"
          >
            <X className="w-3 h-3" />
            Clear
          </button>
        )}
      </div>

      {/* Advanced Filters */}
      <AnimatePresence>
        {showAdvanced && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="flex flex-wrap items-center gap-3 pt-1">
              {/* Date Range */}
              <div className="flex items-center gap-2 bg-white/[0.02] border border-white/[0.06] rounded-xl px-3 py-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                <input
                  type="date"
                  value={filters.startDate}
                  onChange={(e) => updateFilter("startDate", e.target.value)}
                  className="bg-transparent text-sm text-white focus:outline-none [&::-webkit-calendar-picker-indicator]:invert"
                />
                <span className="text-slate-600 text-xs">to</span>
                <input
                  type="date"
                  value={filters.endDate}
                  onChange={(e) => updateFilter("endDate", e.target.value)}
                  className="bg-transparent text-sm text-white focus:outline-none [&::-webkit-calendar-picker-indicator]:invert"
                />
              </div>

              {/* Status Filter */}
              <select
                value={filters.status}
                onChange={(e) => updateFilter("status", e.target.value)}
                className={inputClass}
              >
                <option value="">All Status</option>
                <option value="success">Success</option>
                <option value="failed">Failed</option>
                <option value="pending">Pending</option>
                <option value="refunded">Refunded</option>
              </select>

              {/* Payment Method Filter */}
              <select
                value={filters.paymentMethod}
                onChange={(e) => updateFilter("paymentMethod", e.target.value)}
                className={inputClass}
              >
                <option value="">All Methods</option>
                <option value="card">Card</option>
                <option value="upi">UPI</option>
                <option value="nfc">NFC</option>
              </select>

              {/* Merchant Name */}
              <input
                type="text"
                placeholder="Merchant name..."
                value={filters.merchantName}
                onChange={(e) => updateFilter("merchantName", e.target.value)}
                className={inputClass}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
