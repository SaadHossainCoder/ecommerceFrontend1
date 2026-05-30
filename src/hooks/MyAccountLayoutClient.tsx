"use client";

import { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import { useAuthGuardStore } from "@/store/auth-guard-store";
import { Loader } from "lucide-react";

export default function MyAccountLayoutClient({
    children,
}: {
    children: React.ReactNode;
}) {
    const { role, isAuthenticated, authguard } = useAuthGuardStore();
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

    // Show loading state while initializing
    if (isInitializing) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-muted/30">
                <div className="text-center space-y-4">
                    <div className="flex justify-center">
                        <Loader className="h-12 w-12 animate-spin text-primary" />
                    </div>
                    <div className="space-y-2">
                        <p className="text-lg font-semibold text-foreground">Loading Your Account</p>
                        <p className="text-sm text-muted-foreground">Please wait while we load your account details...</p>
                    </div>
                </div>
            </div>
        );
    }

    // Guard: redirect or show error if not authenticated
    if (!isAuthenticated || !role) {
        redirect("/auth/login");
    }

    return <>{children}</>;
}
