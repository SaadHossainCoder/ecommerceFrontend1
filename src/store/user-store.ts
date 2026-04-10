import { create } from "zustand";
import { userService } from "@/services/user.service";

export interface UserList {
    id: string;
    username: string;
    email: string;
    role: string;
    isEmailVerified: boolean;
    isBlocked?: boolean;
    lockedUntil?: string | null;
    createdAt: string;
    updatedAt: string;
}

interface UserStore {
    users: UserList[];
    isLoading: boolean;
    error: string | null;
    fetchUsers: () => Promise<void>;
    updateUser: (id: string, data: any) => Promise<boolean>;
    deleteUser: (id: string) => Promise<boolean>;
    sendEmail: (id: string, subject: string, message: string) => Promise<boolean>;
}

export const useUserStore = create<UserStore>((set) => ({
    users: [],
    isLoading: false,
    error: null,
    fetchUsers: async () => {
        set({ isLoading: true, error: null });
        try {
            const res = await userService.getAllUsers();
            if (res.ok) {
                set({ users: res.users, isLoading: false });
            } else {
                throw new Error("Failed to fetch users");
            }
        } catch (error: any) {
            set({ error: error.message || "Something went wrong", isLoading: false });
        }
    },
    updateUser: async (id, data) => {
        try {
            const res = await userService.updateUserById(id, data);
            if (res.ok) {
                return true;
            }
            return false;
        } catch (error: any) {
            return false;
        }
    },
    deleteUser: async (id) => {
        try {
            const res = await userService.deleteUserById(id);
            return !!res.ok;
        } catch (error: any) {
            return false;
        }
    },
    sendEmail: async (id, subject, message) => {
        try {
            const res = await userService.sendEmailToUser(id, subject, message);
            return !!res.ok;
        } catch (error: any) {
            return false;
        }
    }
}));
