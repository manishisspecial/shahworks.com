"use client";

import { usePathname } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ChatbotFloatingButtons from "@/components/chatbot/ChatbotFloatingButtons";

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  // Admin routes get a clean layout without the main site nav/footer
  if (isAdminRoute) {
    return <>{children}</>;
  }

  // Normal pages get the full layout
  return (
    <>
      <Navigation />
      <main>{children}</main>
      <Footer />
      <ChatbotFloatingButtons />
    </>
  );
}

