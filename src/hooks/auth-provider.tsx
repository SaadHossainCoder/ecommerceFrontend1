"use client";

import { useEffect, useRef } from "react";
import { useAuthGuardStore } from "@/store/auth-guard-store";

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const { authguard, isAuthenticated, user } = useAuthGuardStore();

    const initialized = useRef(false);

    useEffect(() => {
        if (!initialized.current) {
            initialized.current = true;

            if (!isAuthenticated || !user) {
                authguard();
            }
        }
    }, [authguard, isAuthenticated, user]);

    return <>{children}</>;
};