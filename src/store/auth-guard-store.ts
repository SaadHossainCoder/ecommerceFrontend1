import { create } from "zustand";
import { authService } from "@/services/auth.service";

export interface User {
    id: string;
    username: string;
    role: string;
}

interface AuthGuardResponse {
    isAuthorised: boolean;
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

let authguardPromise: Promise<void> | null = null;

export const useAuthGuardStore = create<AuthGuardState>((set, get) => ({
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
            login: true,
            isAuthenticated: false,
            isLoading: false,
            error: null,
        }),

    authguard: async () => {
        // Dedup identical concurrent requests
        if (authguardPromise) {
            return authguardPromise;
        }

        authguardPromise = (async () => {
            set({ isLoading: true, error: null });

            try {
                const res: AuthGuardResponse = await authService.authguard();
                
                // If auth guard is successful, set user and role
                if (res.isAuthorised && res.user) {
                    set({
                        user: res.user.username,
                        role: res.user.role,
                        login: false,
                        isAuthenticated: true,
                        isLoading: false,
                    });
                    return;
                }
                
                // Handle specific auth guard messages
                if (res.message === "noRefreshToken") {
                    set({ login: true, isAuthenticated: false, user: null, role: null, isLoading: false });
                    console.log("noRefreshToken");
                    return;
                }
                
                // If access token is missing but refresh token exists, try to refresh
                if (res.message === "noAccessToken" || (!res.isAuthorised && res.message?.includes("User not authorised"))) {
                    try {
                        console.log("noAccessToken - Attempting to refresh tokens");
                        await authService.refresh();
                        
                        // Call verify again with new access token
                        const newRes: AuthGuardResponse = await authService.authguard();
                        
                        if (newRes.isAuthorised && newRes.user) {
                            set({
                                user: newRes.user.username,
                                role: newRes.user.role,
                                login: false,
                                isAuthenticated: true,
                                isLoading: false,
                            });
                            return;
                        }
                    } catch (refreshErr) {
                        console.log("Failed to refresh token:", refreshErr);
                    }
                    
                    // If refresh failed or verify after refresh failed
                    set({ isAuthenticated: false, user: null, role: null, login: true, isLoading: false });
                    return;
                }

                // Any other unauthorized state
                set({ isAuthenticated: false, user: null, role: null, login: true, isLoading: false });

            } catch (err: unknown) {
                const message =
                    err instanceof Error
                        ? err.message
                        : "An unexpected error occurred during auth guard";

                set({ error: message, isAuthenticated: false, login: true, isLoading: false });
                throw err;
            } finally {
                authguardPromise = null;
            }
        })();

        return authguardPromise;
    },
}));
