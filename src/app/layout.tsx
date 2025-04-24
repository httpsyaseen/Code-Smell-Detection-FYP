import { Inter } from "next/font/google";
import "./globals.css";
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
      <body className={`${inter.className} bg-gray-50`}>
        <DashboardHeader />
        {children}
      </body>
    </html>
  );
}
