"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2Icon, MailIcon } from "lucide-react";

export default function page() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Here you would call your authentication service
      // For example: await AuthService.forgotPassword(email);
      console.log("Password reset requested for:", email);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Show success message
      setIsSubmitted(true);
    } catch (error: any) {
      setError(error.message || "Failed to request password reset");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-gray-50">
      <Card className="max-w-md shadow-lg border-0 gap-0">
        {!isSubmitted && (
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl font-bold text-center">
              Forgot Password
            </CardTitle>
            <CardDescription className="text-center">
              Enter your email address and we'll send you a link to reset your
              password
            </CardDescription>
          </CardHeader>
        )}

        {isSubmitted ? (
          <CardContent className="">
            <div className="flex flex-col items-center justify-center space-y-3 ">
              <div className="rounded-full bg-green-100 p-3">
                <CheckCircle2Icon className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold">Check your email</h3>
              <p className="text-center text-muted-foreground">
                We've sent a password reset link to{" "}
                <span className="font-medium">{email}</span>
              </p>
            </div>
            <div className="text-center text-sm">
              Didn't receive the email?{" "}
              <Button
                variant="link"
                className="p-0 text-blue-600 hover:underline"
                onClick={() => setIsSubmitted(false)}
              >
                Try again
              </Button>
            </div>
          </CardContent>
        ) : (
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {error && (
                <Alert variant="destructive" className="text-sm">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                    <MailIcon className="h-4 w-4" />
                  </div>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    disabled={isLoading}
                    required
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col mt-4 gap-4">
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading ? "Sending reset link..." : "Send reset link"}
              </Button>

              <div className="text-center text-sm">
                Remember your password?{" "}
                <Link
                  href="/auth/signin"
                  className="text-blue-600 hover:underline"
                >
                  Back to sign in
                </Link>
              </div>
            </CardFooter>
          </form>
        )}
      </Card>
    </div>
  );
}
