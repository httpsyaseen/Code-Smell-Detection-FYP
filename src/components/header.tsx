"use client";

import { useState, useEffect } from "react";
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
import Cookies from "js-cookie";
import Image from "next/image";
import { ModeToggle } from "./theme-togle";

export default function DashboardHeader() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Function to check authentication state
  const checkAuth = () => {
    const token = Cookies.get("token");
    const user = Cookies.get("user");
    setIsAuthenticated(!!token);
    setUserProfile(user ? JSON.parse(user).photo : "");
  };

  // Initial check and listen for auth changes
  useEffect(() => {
    checkAuth(); // Check on mount

    // Listen for custom auth change event
    const handleAuthChange = () => {
      checkAuth();
    };

    window.addEventListener("authChange", handleAuthChange);

    // Cleanup event listener
    return () => {
      window.removeEventListener("authChange", handleAuthChange);
    };
  }, []);

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    setIsAuthenticated(false);
    setUserProfile(null);
    router.push("/login");
    setMobileMenuOpen(false);
    window.dispatchEvent(new Event("authChange"));
  };

  console.log(userProfile);

  return (
    <header className="dark:bg-[#171b35]  sticky top-0 z-50 w-full border-b px-16 bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Code className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold">Code Scent</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <ModeToggle />
          {isAuthenticated ? (
            <>
              <Link
                href="/dashboard"
                className="text-sm font-medium  underline-offset-4"
              >
                Dashboard
              </Link>
              <Link
                href="/all-projects"
                className="text-sm font-medium  underline-offset-4"
              >
                Projects
              </Link>
              <Link
                href="/upload"
                className="text-sm font-medium  underline-offset-4"
              >
                Upload
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full cursor-pointer"
                  >
                    {userProfile ? (
                      <img
                        src={userProfile}
                        alt="User Profile"
                        className="h-10 w-10 object-cover rounded-full shadow-sm"
                      />
                    ) : (
                      <User className="h-5 w-5 " color="white" />
                    )}
                    <span className="sr-only">User menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className=" dark:bg-[#040820]">
                  <DropdownMenuLabel className="font-semibold">
                    My Account
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/settings">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Link
              href="/login"
              className="text-sm font-medium bg-[#126ed3] px-4 py-2 rounded-md text-white  underline-offset-4"
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
          {isAuthenticated ? (
            <>
              <Link
                href="/dashboard"
                className="block py-2 text-blue-800 "
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                href="/dashboard/projects"
                className="block py-2 text-blue-800 "
                onClick={() => setMobileMenuOpen(false)}
              >
                Projects
              </Link>
              <Link
                href="/dashboard/upload"
                className="block py-2 text-blue-800 "
                onClick={() => setMobileMenuOpen(false)}
              >
                Upload
              </Link>
              <Link
                href="/dashboard/profile"
                className="block py-2 text-blue-800 "
                onClick={() => setMobileMenuOpen(false)}
              >
                Profile
              </Link>
              <Link
                href="/dashboard/settings"
                className="block py-2 text-blue-800 "
                onClick={() => setMobileMenuOpen(false)}
              >
                Settings
              </Link>
              <Button
                variant="ghost"
                className="w-full justify-start pl-0 text-blue-800 hover:bg-blue-100 "
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </Button>
            </>
          ) : (
            <Link
              href="/login"
              className="block py-2 text-blue-800 "
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
