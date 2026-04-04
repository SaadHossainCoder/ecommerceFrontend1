import { create } from "zustand";
import { authService } from "@/services/auth.service";
import type { LoginFormValues, SignupFormValues } from "@/validations/auth.validation";
import { userLocalStorageData } from "@/localStorage/userData";

export interface User {
    id: string;
    username: string;
    email: string;
    role: string;
}

interface AuthResponse {
    ok: boolean;
    user?: User;
    message?: string;
}

interface AuthState {
    // State
    user: User | null;
    role: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;

    // Actions
    login: (data: LoginFormValues) => Promise<void>;
    signup: (data: SignupFormValues) => Promise<void>;
    logout: () => Promise<void>;
    checkAuth: () => Promise<void>;
    setError: (error: string | null) => void;
    clearError: () => void;
    reset: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
    user: null,
    role: null,
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

    login: async (data: LoginFormValues) => {
        set({ isLoading: true, error: null });

        try {
            const res: AuthResponse = await authService.login(data);

            if (res.ok && res.user) {
                set({
                    user: res.user,
                    role: res.user.role,
                    isAuthenticated: true,
                    isLoading: false,
                });

                userLocalStorageData.setUser(res.user);
            } else {
                throw new Error(res.message || "Login failed");
            }
        } catch (err: unknown) {
            const message =
                err instanceof Error
                    ? err.message
                    : "An unexpected error occurred during login";

            set({ error: message, isLoading: false });
            throw err; // Allow components to catch if needed
        }
    },

    signup: async (data: SignupFormValues) => {
        set({ isLoading: true, error: null });

        try {
            const res: AuthResponse = await authService.signup(data);

            if (res.ok && res.user) {
                set({
                    user: res.user,
                    role: res.user.role,
                    isAuthenticated: true, // Most backends auto-login after signup
                    isLoading: false,
                });

                userLocalStorageData.setUser(res.user);
            } else {
                throw new Error(res.message || "Signup failed");
            }
        } catch (err: unknown) {
            const message =
                err instanceof Error
                    ? err.message
                    : "An unexpected error occurred during signup";

            set({ error: message, isLoading: false });
            throw err;
        }
    },

    logout: async () => {
        set({ isLoading: true });

        try {
            await authService.logout();
        } catch (err) {
            console.warn("Backend logout failed (proceeding with local cleanup):", err);
        } finally {
            userLocalStorageData.removeUser();
            get().reset();
        }
    },

    checkAuth: async () => {
        // Prevent unnecessary calls if already authenticated
        if (get().isAuthenticated && get().user) return;

        set({ isLoading: true, error: null });

        try {
            const res: AuthResponse = await authService.getMe();

            if (res.ok && res.user) {
                set({
                    user: res.user,
                    role: res.user.role,
                    isAuthenticated: true,
                    isLoading: false,
                });
                userLocalStorageData.setUser(res.user);
            } else {
                throw new Error("Session invalid");
            }
        } catch (err) {
            console.error("checkAuth failed:", err);

            userLocalStorageData.removeUser();
            get().reset();
        }
    },
}));