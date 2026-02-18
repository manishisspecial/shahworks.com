"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Settings, Loader2 } from "lucide-react";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

export default function SettingsPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAdminAuth();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.replace("/admin/login");
    }
  }, [isAuthenticated, authLoading, router]);

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

  return (
    <div className="min-h-screen bg-slate-950">
      <AdminSidebar />
      <div className="lg:pl-[280px] min-h-screen flex flex-col">
        <AdminHeader />
        <main className="flex-1 p-4 lg:p-6 pb-24 lg:pb-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-slate-900/50 border border-white/[0.06] rounded-2xl p-12 text-center">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500/20 to-blue-500/10 flex items-center justify-center mx-auto mb-6">
                <Settings className="w-10 h-10 text-violet-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Settings</h2>
              <p className="text-slate-400 mb-6">
                Configure your admin dashboard preferences
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm">
                <span>Coming Soon</span>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}

