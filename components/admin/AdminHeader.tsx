"use client";

import { Bell, Search, Sun, Moon } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { motion } from "framer-motion";

const pageTitles: Record<string, { title: string; subtitle: string }> = {
  "/admin": { title: "Dashboard", subtitle: "POS Transaction Monitoring" },
  "/admin/terminals": { title: "POS Terminals", subtitle: "Manage terminal devices" },
  "/admin/activity": { title: "Activity Log", subtitle: "System activity and audit logs" },
  "/admin/settings": { title: "Settings", subtitle: "Configure dashboard preferences" },
  "/admin/help": { title: "Help & Support", subtitle: "Get assistance and documentation" },
};

export default function AdminHeader() {
  const { user } = useAdminAuth();
  const [isDark, setIsDark] = useState(true);
  const pathname = usePathname();
  const pageInfo = pageTitles[pathname || "/admin"] || pageTitles["/admin"];

  return (
    <header className="sticky top-0 z-30 h-[72px] bg-slate-900/80 backdrop-blur-xl border-b border-white/[0.06] flex items-center justify-between px-6 lg:px-8">
      {/* Left — Page Title */}
      <div>
        <h1 className="text-lg font-bold text-white">{pageInfo.title}</h1>
        <p className="text-xs text-slate-500">{pageInfo.subtitle}</p>
      </div>

      {/* Right — Actions */}
      <div className="flex items-center gap-3">
        {/* Theme Toggle */}
        <button
          onClick={() => setIsDark(!isDark)}
          className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/[0.08] transition-all"
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Notifications */}
        <button className="relative w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/[0.08] transition-all">
          <Bell className="w-4 h-4" />
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-violet-500 rounded-full border-2 border-slate-900" />
        </button>

        {/* User Avatar */}
        <div className="hidden sm:flex items-center gap-3 pl-3 ml-1 border-l border-white/[0.06]">
          <div>
            <p className="text-sm font-medium text-white text-right">
              {user?.name || "Admin"}
            </p>
            <p className="text-[10px] text-slate-500 text-right">
              {user?.role || "Super Admin"}
            </p>
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-blue-600 flex items-center justify-center text-sm font-bold text-white shadow-lg shadow-violet-500/20 cursor-pointer"
          >
            {user?.name?.charAt(0) || "A"}
          </motion.div>
        </div>
      </div>
    </header>
  );
}

