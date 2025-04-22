"use client";

import { useState } from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Code,
  LogOut,
  Menu,
  Plus,
  Settings,
  User,
  Home,
  FileText,
  FolderKanban,
} from "lucide-react";

export default function HeaderWithSidebar() {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Replace with real auth check
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <header className="h-16 px-4 md:px-6 border-b dark:border-[#1F1F23] bg-white dark:bg-[#0F0F12] flex items-center justify-between w-full sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-700 dark:text-gray-300"
              >
                <Menu size={20} />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[250px] p-0">
              <div className="py-4">
                <div className="px-4 py-2">
                  <Link
                    href="/"
                    className="flex items-center gap-2"
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <Code size={24} color="#126ed3" />
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      CodeSmell
                    </span>
                  </Link>
                </div>
                <nav className="mt-4">
                  <ul className="space-y-1">
                    <li>
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                        onClick={() => setIsSidebarOpen(false)}
                      >
                        <Home size={16} />
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/reports"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                        onClick={() => setIsSidebarOpen(false)}
                      >
                        <FileText size={16} />
                        Reports
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/projects"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                        onClick={() => setIsSidebarOpen(false)}
                      >
                        <FolderKanban size={16} />
                        Projects
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </SheetContent>
          </Sheet>

          <Link href="/" className="flex items-center gap-2">
            <Code size={28} color="#126ed3" />
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              CodeSmell
            </span>
          </Link>
        </div>

        {/* Right side: Upload button + Avatar */}
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              {/* Upload New Project Button */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <Plus size={20} />
                    <span className="sr-only">New project</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Link
                      href="/projects/new"
                      className="flex items-center w-full"
                    >
                      Upload a new project
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* User Avatar with Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer h-8 w-8">
                    <AvatarImage
                      src="/placeholder.svg?height=32&width=32"
                      alt="User"
                    />
                    <AvatarFallback className="bg-[#126ed3] text-white">
                      US
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Link href="/profile" className="flex items-center w-full">
                      <User className="mr-2" size={16} />
                      My Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/settings" className="flex items-center w-full">
                      <Settings className="mr-2" size={16} />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <button
                      className="flex items-center w-full"
                      onClick={() => setIsAuthenticated(false)}
                    >
                      <LogOut className="mr-2" size={16} />
                      Logout
                    </button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button className="bg-[#126ed3] hover:bg-[#1263d3]">
              <Link href="/login" className="text-white">
                Login
              </Link>
            </Button>
          )}
        </div>
      </header>
    </>
  );
}
