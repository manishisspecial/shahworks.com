"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  CheckCircle,
  XCircle,
  Clock,
  RefreshCw,
  CreditCard,
  Smartphone,
  Banknote,
  MoreHorizontal,
  Copy,
  Radio,
} from "lucide-react";
import type { POSTransaction } from "@/app/api/pos/transactions/route";

interface TransactionDetailModalProps {
  transaction: POSTransaction | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function TransactionDetailModal({
  transaction,
  isOpen,
  onClose,
}: TransactionDetailModalProps) {
  if (!transaction) return null;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-emerald-400" />;
      case "failed":
        return <XCircle className="w-5 h-5 text-red-400" />;
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-400" />;
      case "refunded":
        return <RefreshCw className="w-5 h-5 text-blue-400" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "failed":
        return "bg-red-500/10 text-red-400 border-red-500/20";
      case "pending":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
      case "refunded":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      default:
        return "bg-slate-500/10 text-slate-400 border-slate-500/20";
    }
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case "card":
        return <CreditCard className="w-4 h-4" />;
      case "upi":
        return <Smartphone className="w-4 h-4" />;
      case "nfc":
        return <Radio className="w-4 h-4" />;
      case "cash":
        return <Banknote className="w-4 h-4" />;
      default:
        return <MoreHorizontal className="w-4 h-4" />;
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const details = [
    { label: "Transaction ID", value: transaction.transactionId, copyable: true },
    { label: "Reference Number (RRN)", value: transaction.referenceNumber, copyable: true },
    ...(transaction.externalRef ? [{ label: "External Ref", value: transaction.externalRef, copyable: true }] : []),
    { label: "Terminal ID", value: transaction.terminalId },
    { label: "Merchant / Retailer", value: transaction.merchantName },
    ...(transaction.retailerCode ? [{ label: "Retailer Code", value: transaction.retailerCode }] : []),
    ...(transaction.cardBrand ? [{ label: "Card Brand", value: transaction.cardBrand }] : []),
    ...(transaction.cardType ? [{ label: "Card Type", value: transaction.cardType }] : []),
    ...(transaction.settlementStatus ? [{ label: "Settlement Status", value: transaction.settlementStatus }] : []),
    ...(transaction.deviceSerial ? [{ label: "Device Serial", value: transaction.deviceSerial }] : []),
    {
      label: "Date & Time",
      value: new Date(transaction.timestamp).toLocaleString("en-IN", {
        dateStyle: "full",
        timeStyle: "medium",
      }),
    },
    { label: "Description", value: transaction.description || "—" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Slide-over Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-lg bg-slate-900 border-l border-white/[0.06] shadow-2xl overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur-xl border-b border-white/[0.06] px-6 py-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-white">Transaction Details</h2>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/[0.08] transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Amount & Status */}
              <div className="bg-gradient-to-br from-violet-500/10 via-blue-500/5 to-transparent border border-violet-500/10 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-slate-400">Amount</span>
                  <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-medium ${getStatusColor(transaction.status)}`}>
                    {getStatusIcon(transaction.status)}
                    <span className="capitalize">{transaction.status}</span>
                  </div>
                </div>
                <p className="text-4xl font-bold text-white">
                  ₹{transaction.amount.toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
                <div className="flex items-center gap-2 mt-3 text-sm text-slate-400">
                  {getPaymentMethodIcon(transaction.paymentMethod)}
                  <span className="capitalize">{transaction.paymentMethod}</span>
                  <span className="text-slate-600">•</span>
                  <span>{transaction.currency}</span>
                  {transaction.cardBrand && (
                    <>
                      <span className="text-slate-600">•</span>
                      <span>{transaction.cardBrand}</span>
                    </>
                  )}
                </div>
              </div>

              {/* Details */}
              <div className="space-y-1">
                {details.map((detail) => (
                  <div
                    key={detail.label}
                    className="flex items-start justify-between py-3 border-b border-white/[0.04] last:border-0"
                  >
                    <span className="text-sm text-slate-500">{detail.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-white text-right max-w-[220px] truncate">
                        {detail.value}
                      </span>
                      {detail.copyable && (
                        <button
                          onClick={() => copyToClipboard(detail.value)}
                          className="text-slate-600 hover:text-violet-400 transition-colors"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
