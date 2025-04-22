import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function UnAuthHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-blue-600 text-white font-bold mr-2">
              <Image src={"/logo.png"} alt="logo" height={36} width={36} />
            </div>
            <span className="text-xl font-semibold">CodeScent</span>
          </Link>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-3">
          <Link
            href="/login"
            className="text-sm font-medium text-muted-foreground hover:text-blue-600"
          >
            Sign in
          </Link>
          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <Link href="/signup">Sign up</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
