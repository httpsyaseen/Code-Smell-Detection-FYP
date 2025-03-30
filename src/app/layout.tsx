import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";

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
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-[#0A0A0C]">
          <Header />
          <div className="flex flex-1 max-h-[calc(100vh-4rem)]">
            <Sidebar />
            <main className="flex-1 p-4 overflow-y-auto bg-gray-100">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
