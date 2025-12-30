import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ChatbotProvider } from "@/contexts/ChatbotContext";
import ChatbotFloatingButtons from "@/components/chatbot/ChatbotFloatingButtons";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shah Works - High-Performance Digital Products That Scale",
  description:
    "Premium software development and web design agency. We build high-performance digital products that help businesses scale and grow.",
  keywords: [
    "web development",
    "software development",
    "website design",
    "web applications",
    "UI/UX design",
    "digital products",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <ThemeProvider>
          <ChatbotProvider>
            <Navigation />
            <main>{children}</main>
            <Footer />
            <ChatbotFloatingButtons />
          </ChatbotProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

