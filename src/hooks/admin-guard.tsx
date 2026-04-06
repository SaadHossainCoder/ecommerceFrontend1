"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, ShieldAlert } from "lucide-react";
import { useAuthGuardStore } from "@/store/auth-guard-store";

interface AdminGuardProps {
  children: React.ReactNode;
}

export const AdminGuard = ({ children }: AdminGuardProps) => {
  const router = useRouter();
  const { role, isLoading, isAuthenticated, authguard } = useAuthGuardStore();

  const [isInitializing, setIsInitializing] = useState(true);
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false);

  useEffect(() => {
    let mounted = true;

    const initialize = async () => {
      try {
        // Only call authguard when we do not already know the user state
        if (!isAuthenticated || !role) {
          await authguard();
        }
      } finally {
        if (mounted) {
          setHasCheckedAuth(true);
          setIsInitializing(false);
        }
      }
    };

    initialize();

    return () => {
      mounted = false;
    };
  }, [authguard, isAuthenticated, role]);

  useEffect(() => {
    if (!isInitializing && hasCheckedAuth && !isLoading && !isAuthenticated) {
      router.replace("/auth/login");
    }
  }, [isInitializing, hasCheckedAuth, isLoading, isAuthenticated, router]);

  if (isLoading || isInitializing) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-background px-4">
        <div className="flex flex-col items-center gap-4 rounded-2xl border bg-card px-8 py-10 shadow-sm">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <div className="text-center">
            <p className="text-lg font-semibold text-foreground">
              Verifying admin access
            </p>
            <p className="text-sm text-muted-foreground">
              Checking session and permissions...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (isAuthenticated && role !== "ADMIN") {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-background px-4">
        <div className="w-full max-w-md rounded-2xl border bg-card p-8 text-center shadow-sm">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
            <ShieldAlert className="h-8 w-8 text-destructive" />
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Access Denied
          </h1>

          <p className="mt-3 text-base text-muted-foreground">
            You do not have administrator privileges to view this page.
          </p>

          <p className="mt-2 text-sm text-muted-foreground">
            Please contact your administrator if you believe this is an error.
          </p>

          <button
            type="button"
            onClick={() => router.replace("/")}
            className="mt-6 inline-flex h-10 items-center justify-center rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground transition hover:opacity-90"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};