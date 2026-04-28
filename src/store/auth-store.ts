import { create } from "zustand";
import { authService } from "@/services/auth.service";
import type { LoginFormValues, SignupFormValues, UpdateProfileFormValues } from "@/validations/auth.validation";


// Mirrors all safe (non-sensitive) fields from the Prisma User model
export interface User {
    id: string;
    username: string;
    email: string;
    phoneNumber: string | null;
    countryCode: string | null;
    gender: string | null;
    dateOfBirth: string | null;
    role: string;                  // "USER" | "ADMIN" | "VENDOR" etc.
    isEmailVerified: boolean;
    isBlocked: boolean;
    lockedUntil: string | null;    // ISO datetime string or null
    createdAt: string;             // ISO datetime string
    updatedAt: string;             // ISO datetime string
}

interface AuthResponse {
    ok: boolean;
    user?: User;
    message?: string;
}

interface AuthState {
    // State
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;

    // Actions
    login: (data: LoginFormValues) => Promise<void>;
    signup: (data: SignupFormValues) => Promise<void>;
    logout: () => Promise<void>;
    updateProfile: (data: UpdateProfileFormValues) => Promise<void>;
    fetchMe: () => Promise<void>;
    setError: (error: string | null) => void;
    clearError: () => void;
    reset: () => void;
}



export const useAuthStore = create<AuthState>((set, get) => ({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,

    // ─── Simple setters ───────────────────────────────────────────────────────
    setError: (error) => set({ error }),
    clearError: () => set({ error: null }),

    // Full reset (used on logout and failed auth)
    reset: () =>
        set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
        }),

    // ─── Fetch current user from backend (called on page load) ────────────────
    fetchMe: async () => {
        set({ isLoading: true });
        try {
            const res: AuthResponse = await authService.getMe();
            if (res.ok && res.user) {
                set({ user: res.user, isAuthenticated: true, isLoading: false });
            } else {
                set({ isLoading: false });
            }
        } catch {
            set({ isLoading: false });
            // Silent fail — user simply stays unauthenticated
        }
    },

    // ─── Login ───────────────────────────────────────────────────────────────
    login: async (data: LoginFormValues) => {
        set({ isLoading: true, error: null });

        try {
            const res: AuthResponse = await authService.login(data);

            if (res.ok && res.user) {
                set({
                    user: res.user,
                    isAuthenticated: true,
                    isLoading: false,
                });

            } else {
                throw new Error(res.message || "Login failed");
            }
        } catch (err: unknown) {
            const message =
                err instanceof Error
                    ? err.message
                    : "An unexpected error occurred during login";

            set({ error: message, isLoading: false });
            throw err;
        }
    },

    // ─── Signup ──────────────────────────────────────────────────────────────
    signup: async (data: SignupFormValues) => {
        set({ isLoading: true, error: null });

        try {
            const res: AuthResponse = await authService.signup(data);

            if (res.ok && res.user) {
                set({
                    user: res.user,
                    isAuthenticated: true,
                    isLoading: false,
                });

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


    updateProfile: async (data: UpdateProfileFormValues) => {
        set({ isLoading: true, error: null });

        try {
            const res: AuthResponse = await authService.profileUpdate(data);

            if (res.ok && res.user) {
                set({
                    user: res.user,
                    isAuthenticated: true,
                    isLoading: false,
                });
            } else {
                throw new Error(res.message || "Update profile failed");
            }
        } catch (err: unknown) {
            const message =
                err instanceof Error
                    ? err.message
                    : "An unexpected error occurred during update profile";

            set({ error: message, isLoading: false });
            throw err;
        }
    },

    // ─── Logout ──────────────────────────────────────────────────────────────
    logout: async () => {
        set({ isLoading: true });

        try {
            await authService.logout();
        } catch (err) {
            console.warn("Backend logout failed (proceeding with local cleanup):", err);
        } finally {

            get().reset();
        }
    },
}));