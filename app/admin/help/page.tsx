"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { HelpCircle, Loader2, Mail, MessageCircle, Book } from "lucide-react";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

export default function HelpPage() {
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
            className="max-w-4xl mx-auto space-y-6"
          >
            <div className="bg-slate-900/50 border border-white/[0.06] rounded-2xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-blue-500/10 flex items-center justify-center">
                  <HelpCircle className="w-6 h-6 text-violet-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Help & Support</h2>
                  <p className="text-slate-400 text-sm">Get assistance with your POS dashboard</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-6 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-violet-500/20 transition-colors">
                  <Book className="w-6 h-6 text-violet-400 mb-3" />
                  <h3 className="text-lg font-semibold text-white mb-2">Documentation</h3>
                  <p className="text-sm text-slate-400 mb-4">
                    Browse our comprehensive guides and API documentation
                  </p>
                  <button className="text-sm text-violet-400 hover:text-violet-300">
                    View Docs →
                  </button>
                </div>

                <div className="p-6 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-violet-500/20 transition-colors">
                  <MessageCircle className="w-6 h-6 text-violet-400 mb-3" />
                  <h3 className="text-lg font-semibold text-white mb-2">Live Chat</h3>
                  <p className="text-sm text-slate-400 mb-4">
                    Chat with our support team for instant help
                  </p>
                  <button className="text-sm text-violet-400 hover:text-violet-300">
                    Start Chat →
                  </button>
                </div>

                <div className="p-6 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-violet-500/20 transition-colors">
                  <Mail className="w-6 h-6 text-violet-400 mb-3" />
                  <h3 className="text-lg font-semibold text-white mb-2">Email Support</h3>
                  <p className="text-sm text-slate-400 mb-4">
                    Send us an email and we&apos;ll get back to you
                  </p>
                  <a
                    href="mailto:support@samedaysolution.in"
                    className="text-sm text-violet-400 hover:text-violet-300"
                  >
                    support@samedaysolution.in →
                  </a>
                </div>

                <div className="p-6 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-violet-500/20 transition-colors">
                  <HelpCircle className="w-6 h-6 text-violet-400 mb-3" />
                  <h3 className="text-lg font-semibold text-white mb-2">FAQs</h3>
                  <p className="text-sm text-slate-400 mb-4">
                    Find answers to commonly asked questions
                  </p>
                  <button className="text-sm text-violet-400 hover:text-violet-300">
                    Browse FAQs →
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}

