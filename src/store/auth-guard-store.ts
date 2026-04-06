import { create } from "zustand";
import { authService } from "@/services/auth.service";
export interface User {
    id: string;
    username: string;
    role: string;
}

interface AuthGuardResponse {
    ok: boolean;
    user?: User;
    message?: string;
}

interface AuthGuardState {
    // State
    user: string | null;
    role: string | null;
    login: boolean;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;

    // Actions
    authguard: () => Promise<void>;
    setError: (error: string | null) => void;
    clearError: () => void;
    reset: () => void;
}

export const useAuthGuardStore = create<AuthGuardState>((set) => ({
    user: null,
    role: null,
    login: false,
    isAuthenticated: false,
    isLoading: false,
    error: null,

    // Simple setters
    setError: (error) => set({ error }),
    clearError: () => set({ error: null }),

    // Full reset (used in logout and failed auth)
    reset: () =>
        set({
            user: null,
            role: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
        }),

    authguard: async () => {
        set({ isLoading: true, error: null });

        try {
            const res: AuthGuardResponse = await authService.authguard();
            // If auth guard is successful, set user and role
            if (res.ok && res.user) {
                set({
                    user: res.user.username,
                    role: res.user.role,
                    isAuthenticated: true,
                    isLoading: false,
                });
                return;
            }
            
            // Handle specific auth guard messages
            if (res.message === "noRefreshToken") {
                set({ login: true, isLoading: false });
                return ;
            }
            // If access token is missing but refresh token exists, try to refresh
            if (res.message === "noAccessToken") {
                authService.refresh();
                set({ isAuthenticated: false, isLoading: false });
                return ;
            }
            

        } catch (err: unknown) {
            const message =
                err instanceof Error
                    ? err.message
                    : "An unexpected error occurred during auth guard";

            set({ error: message, isLoading: false });
            throw err;
        }
    },
}));
