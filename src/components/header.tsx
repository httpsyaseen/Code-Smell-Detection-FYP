"use client";

import { Bell, Plus, Search, Settings, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="h-16 border-b border-gray-200 dark:border-[#1F1F23] bg-white dark:bg-[#0F0F12] flex items-center justify-between px-4 w-full">
      <div className="flex items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center mr-6">
          <div className="flex items-center justify-center h-8 w-8 rounded-md bg-blue-600 text-white font-bold mr-2">
            CS
          </div>
          <span className="font-semibold text-gray-900 dark:text-white hidden md:block">
            CodeSmell
          </span>
        </Link>

        {/* Global search */}
        <div className="relative max-w-md w-64 hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input
            type="text"
            placeholder="Search code smells, projects..."
            className="pl-10 h-8 w-full bg-gray-100 dark:bg-gray-800 border-0"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <Button variant="ghost" size="icon" className="rounded-full">
          <Plus className="h-5 w-5 text-gray-600 dark:text-gray-300" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Bell className="h-5 w-5 text-gray-600 dark:text-gray-300" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Settings className="h-5 w-5 text-gray-600 dark:text-gray-300" />
        </Button>
        <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
          <User className="h-4 w-4 text-gray-600 dark:text-gray-300" />
        </div>
      </div>
    </header>
  );
}
