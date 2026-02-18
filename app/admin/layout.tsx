import { AdminAuthProvider } from "@/contexts/AdminAuthContext";

export const metadata = {
  title: "Admin Dashboard | Shah Works",
  description: "POS Transaction Monitoring Dashboard",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminAuthProvider>
      <div className="admin-root">
        {children}
      </div>
    </AdminAuthProvider>
  );
}

