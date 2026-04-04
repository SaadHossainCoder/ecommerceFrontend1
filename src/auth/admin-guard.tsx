"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { Loader2, ShieldAlert } from "lucide-react";

interface AdminGuardProps {
    children: React.ReactNode;
}

export const AdminGuard = ({ children }: AdminGuardProps) => {
    const { user, role, isLoading, checkAuth } = useAuthStore();
    const router = useRouter();

    const [isChecking, setIsChecking] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState(false);

    // Run auth check once on mount
    useEffect(() => {
        const initializeAuth = async () => {
            // If we don't have user data yet, trigger checkAuth
            if (!user) {
                await checkAuth();
            }
            setIsChecking(false);
        };

        initializeAuth();
    }, [checkAuth, user]);

    // Authorization logic
    useEffect(() => {
        if (isChecking || isLoading) return;

        const isAdmin = user?.role === "ADMIN" || role === "ADMIN";

        if (isAdmin) {
            setIsAuthorized(true);
        } else {
            setIsAuthorized(false);
            // Small delay to show "Access Denied" screen instead of instant redirect
            const timer = setTimeout(() => {
                router.push("/auth/login");
            }, 1500);

            return () => clearTimeout(timer);
        }
    }, [user, role, isChecking, isLoading, router]);

    // Loading State
    if (isLoading || isChecking) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-background">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="h-10 w-10 animate-spin text-primary" />
                    <p className="text-lg font-medium text-muted-foreground animate-pulse">
                        Verifying Admin Access...
                    </p>
                </div>
            </div>
        );
    }

    // Access Denied State
    if (!isAuthorized) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-background">
                <div className="flex flex-col items-center gap-6 max-w-md text-center px-4">
                    <div className="bg-destructive/10 p-4 rounded-full">
                        <ShieldAlert className="h-16 w-16 text-destructive" />
                    </div>
                    <div className="space-y-3">
                        <h1 className="text-3xl font-bold tracking-tight">Access Denied</h1>
                        <p className="text-muted-foreground text-lg">
                            You do not have the required administrator privileges to access this page.
                        </p>
                        <p className="text-sm text-muted-foreground">
                            Redirecting to login...
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    // Authorized - Render children
    return <>{children}</>;
};