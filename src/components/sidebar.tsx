"use client";

import { BarChart2, FileUp, LayoutDashboard } from "lucide-react";
import Link from "next/link";

function NavItem({
  href,
  icon: Icon,
  children,
}: {
  href: string;
  icon: any;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-primary/10 hover:text-primary dark:hover:text-primary rounded-lg transition-colors"
    >
      <Icon className="h-5 w-5" />
      {children}
    </Link>
  );
}

export default function Sidebar() {
  return (
    <nav className="fixed left-0 top-0 min-h-screen w-64 border-r border-gray-200 dark:border-[#1F1F23] bg-white dark:bg-[#0F0F12] px-4 py-6">
      <div className="mb-8 text-xl font-bold text-primary tracking-tight">
        CodeScent
      </div>
      <div className="space-y-2">
        <NavItem href="/" icon={LayoutDashboard}>
          Dashboard
        </NavItem>
        <NavItem href="/new-project" icon={FileUp}>
          Upload New Project
        </NavItem>
        <NavItem href="/reports" icon={BarChart2}>
          Reports
        </NavItem>
      </div>
    </nav>
  );
}
