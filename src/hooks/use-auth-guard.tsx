"use client";

import { useAuthGuardStore } from "@/store/auth-guard-store";
import { toast } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const useAuthGuard = () => {
    const { isAuthenticated, authguard, user, isLoading } = useAuthGuardStore();

    const guard = async (): Promise<boolean> => {
        // Already authenticated → allow access
        if (isAuthenticated && user) {
            return true;
        }

        // Prevent duplicate calls during loading
        if (isLoading) return false;

        try {
            await authguard();

            // Re-check state after authguard finishes
            const state = useAuthGuardStore.getState();

            if (state.isAuthenticated && state.user) {
                return true;
            }

            // Not authenticated
            toast({
                variant: "destructive",
                title: "Login Required",
                description: "Please sign in to continue.",
                action: (
                    <Link href="/auth/login">
                        <Button size="sm" className="mt-2 w-full">
                            Login Now
                        </Button>
                    </Link>
                ),
            });

            return false;
        } catch (error) {
            console.error("Auth guard failed:", error);

            toast({
                variant: "destructive",
                title: "Session Expired",
                description: "Your session has expired. Please log in again.",
                action: (
                    <Link href="/auth/login">
                        <Button size="sm" className="mt-2 w-full">
                            Login Now
                        </Button>
                    </Link>
                ),
            });

            return false;
        }
    };

    return guard;
};