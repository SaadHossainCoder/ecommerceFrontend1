import { create } from "zustand";
import { authService } from "@/services/auth.service";
import { LoginFormValues, SignupFormValues } from "@/validations/auth.validation";
// Update the import based on the actual export from userData module
import { userLocalStorageData } from "@/localStorage/userData";

export interface User {
    id: string;
    username: string;
    email: string;
    role: string;
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;

    login: (data: LoginFormValues) => Promise<void>;
    signup: (data: SignupFormValues) => Promise<void>;
    logout: () => Promise<void>;
    setLoading: (isLoading: boolean) => void;
    setError: (error: string | null) => void;
    checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null, // Full user data will be loaded via checkAuth
    role: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,

    setLoading: (isLoading) => set({ isLoading }),
    setError: (error) => set({ error }),

    login: async (data) => {
        set({ isLoading: true, error: null });
        try {
            const res = await authService.login(data);
            if (res.ok) {
                set({
                    user: res.user,
                    role: res.user?.role || null,
                    isAuthenticated: true,
                    isLoading: false,
                });
                userLocalStorageData.setUser(res!.user!); // Store only user ID in localStorage
            }
        } catch (error: any) {
            set({
                error: error.response?.data?.message || "Login failed",
                isLoading: false,
            });

            throw error;
        }
    },

    signup: async (data) => {
        set({ isLoading: true, error: null });
        try {
            const res = await authService.signup(data);
            if (res.ok) {
                set({
                    user: res.user || null,
                    isAuthenticated: !!res.user, // Depending on if backend logs user in on signup
                    isLoading: false,
                });
            }
        } catch (error: any) {
            set({
                error: error.response?.data?.message || "Signup failed",
                isLoading: false,
            });
            throw error;
        }
    },


    logout: async () => {
        try {
            await authService.logout();
            userLocalStorageData.removeUser();
        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            set({
                user: null,
                isAuthenticated: false,
            });
            userLocalStorageData.removeUser();
        }
    },


    checkAuth: async () => {
        try {
            const res = await authService.getMe();
            if (res.ok && res.user) {
                set({
                    user: res.user,
                    isAuthenticated: true,
                });
                userLocalStorageData.setUser(res!.user!);
            }
            else {
                set({
                    user: null,
                    isAuthenticated: false,
                });
                userLocalStorageData.removeUser();
            }
        } catch (error) {
            console.error("Check auth failed:", error);
            set({
                user: null,
                isAuthenticated: false,
            });
            userLocalStorageData.removeUser();
        }
    },
}));
