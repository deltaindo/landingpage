"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

/**
 * 🔐 SSO Callback Handler
 *
 * This page receives the SSO token after authentication
 * When WireGuard VPN is active, the token validation happens over encrypted tunnel
 */

export default function SSOCallbackPage() {
  const [status, setStatus] = useState<"processing" | "success" | "error">(
    "processing"
  );
  const [message, setMessage] = useState("Processing SSO authentication...");
  const router = useRouter();
  const searchParams = useSearchParams();
  const { loginWithSSO } = useAuth();

  useEffect(() => {
    handleSSOCallback();
  }, []);

  const handleSSOCallback = async () => {
    try {
      // Get SSO token from URL
      const token = searchParams.get("token");
      const error = searchParams.get("error");

      if (error) {
        setStatus("error");
        setMessage(`SSO Error: ${error}`);
        setTimeout(() => router.push("/admin/login"), 3000);
        return;
      }

      if (!token) {
        setStatus("error");
        setMessage("No SSO token received");
        setTimeout(() => router.push("/admin/login"), 3000);
        return;
      }

      // Validate SSO token through VPN tunnel
      await loginWithSSO(token);
      setStatus("success");
      setMessage("SSO authentication successful! Redirecting...");

      // Redirect happens in loginWithSSO function
    } catch (error: any) {
      console.error("SSO callback error:", error);
      setStatus("error");
      setMessage(error.message || "SSO authentication failed");
      setTimeout(() => router.push("/admin/login"), 3000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 text-center">
        {status === "processing" && (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">{message}</p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <svg
                className="h-6 w-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <p className="mt-4 text-gray-900 font-semibold">{message}</p>
          </>
        )}

        {status === "error" && (
          <>
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
              <svg
                className="h-6 w-6 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <p className="mt-4 text-red-600 font-semibold">{message}</p>
            <p className="text-sm text-gray-500">Redirecting to login...</p>
          </>
        )}
      </div>
    </div>
  );
}
