import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import Footer from "@/components/Footer";
import UnAuthHeader from "@/components/UnAuthHeader";
import HeaderWithSidebar from "@/components/navbar";
import DashboardHeader from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Code Smell Detection",
  description: "A modern web app for code smell detection",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <DashboardHeader isAuthenticated={true} />
        {children}
      </body>
    </html>
  );
}
