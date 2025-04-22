"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Code, User, LogOut, Menu, X } from "lucide-react";

interface DashboardHeaderProps {
  isAuthenticated: boolean;
}

export default function DashboardHeader({
  isAuthenticated,
}: DashboardHeaderProps) {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    router.push("/login");
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b  px-16 bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Code className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold ">Code Scent</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {isAuthenticated ? (
            <>
              <Link
                href="/dashboard"
                className="text-sm font-medium  hover:underline underline-offset-4"
              >
                Dashboard
              </Link>
              <Link
                href="/projects"
                className="text-sm font-medium  hover:underline underline-offset-4"
              >
                Projects
              </Link>
              <Link
                href="/upload"
                className="text-sm font-medium  hover:underline underline-offset-4"
              >
                Upload
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full hover:bg-blue-100"
                  >
                    <User className="h-5 w-5 " />
                    <span className="sr-only">User menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="bg-white border border-blue-100"
                >
                  <DropdownMenuLabel className=" font-semibold">
                    My Account
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/profile" className="">
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/settings" className="">
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="">
                    <span>Logout</span>
                    <LogOut className="mr-2 h-4 w-4" />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Link
              href="/login"
              className="text-sm font-medium bg-blue-500 px-4 py-2 rounded-md text-white hover:underline underline-offset-4"
            >
              Login
            </Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden hover:bg-blue-100"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6 text-blue-600" />
          ) : (
            <Menu className="h-6 w-6 text-blue-600" />
          )}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-blue-100 p-4 space-y-4 bg-blue-50">
          CIS-{" "}
          {isAuthenticated ? (
            <>
              <Link
                href="/dashboard"
                className="block py-2 text-blue-800 hover:underline"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                href="/dashboard/projects"
                className="block py-2 text-blue-800 hover:underline"
                onClick={() => setMobileMenuOpen(false)}
              >
                Projects
              </Link>
              <Link
                href="/dashboard/upload"
                className="block py-2 text-blue-800 hover:underline"
                onClick={() => setMobileMenuOpen(false)}
              >
                Upload
              </Link>
              <Link
                href="/dashboard/profile"
                className="block py-2 text-blue-800 hover:underline"
                onClick={() => setMobileMenuOpen(false)}
              >
                Profile
              </Link>
              <Link
                href="/dashboard/settings"
                className="block py-2 text-blue-800 hover:underline"
                onClick={() => setMobileMenuOpen(false)}
              >
                Settings
              </Link>
              <Button
                variant="ghost"
                className="w-full justify-start pl-0 text-blue-800 hover:bg-blue-100 hover:underline"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </Button>
            </>
          ) : (
            <Link
              href="/login"
              className="block py-2 text-blue-800 hover:underline"
              onClick={() => setMobileMenuOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
