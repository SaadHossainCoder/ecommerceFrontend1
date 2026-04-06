import { create } from "zustand";
import { authService } from "@/services/auth.service";
import type { LoginFormValues, SignupFormValues } from "@/validations/auth.validation";
import { userLocalStorageData } from "@/localStorage/userData";

// Mirrors all safe (non-sensitive) fields from the Prisma User model
export interface User {
    id: string;
    username: string;
    email: string;
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
    setError: (error: string | null) => void;
    clearError: () => void;
    reset: () => void;
}

// Hydrate minimal session from localStorage on store creation.
// Full user data (username, email, flags, etc.) is populated after login/signup.
const _stored = userLocalStorageData.getUser(); // returns { id, role } | null

export const useAuthStore = create<AuthState>((set, get) => ({
    // If localStorage has a session, mark as authenticated with partial data.
    // Components that need full user data should call authService.getMe() separately.
    user: _stored
        ? {
              id: _stored.id,
              username: "",
              email: "",
              role: _stored.role,
              isEmailVerified: false,
              isBlocked: false,
              lockedUntil: null,
              createdAt: "",
              updatedAt: "",
          }
        : null,
    isAuthenticated: !!_stored,
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
                // Persist minimal session data (id + role only)
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

    // ─── Logout ──────────────────────────────────────────────────────────────
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
}));