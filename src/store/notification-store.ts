import { create } from "zustand";
import { notificationBarService, TopBarNotification, CreateNotificationData, UpdateNotificationData } from "@/services/notification-bar.service";

interface NotificationStoreState {
    notifications: TopBarNotification[];
    isLoading: boolean;
    error: string | null;
    fetchNotifications: (force?: boolean) => Promise<void>;
    addNotification: (data: CreateNotificationData) => Promise<boolean>;
    editNotification: (id: string, data: UpdateNotificationData) => Promise<boolean>;
    removeNotification: (id: string) => Promise<boolean>;
}

export const useNotificationStore = create<NotificationStoreState>((set, get) => ({
    notifications: [],
    isLoading: false,
    error: null,

    fetchNotifications: async (force = false) => {
        if (!force && get().notifications.length > 0) return;

        set({ isLoading: true, error: null });
        try {
            const res = await notificationBarService.getAll();
            set({ notifications: res.data || [], isLoading: false });
        } catch (error: any) {
            set({ error: error.response?.data?.message || error.message || "Failed to fetch notifications", isLoading: false });
        }
    },

    addNotification: async (data) => {
        set({ isLoading: true, error: null });
        try {
            const res = await notificationBarService.create(data);
            if (res.ok) {
                const updated = await notificationBarService.getAll();
                set({ notifications: updated.data || [], isLoading: false });
                return true;
            }
            throw new Error(res.message);
        } catch (error: any) {
            set({ error: error.response?.data?.message || error.message || "Failed to add notification", isLoading: false });
            return false;
        }
    },

    editNotification: async (id, data) => {
        set({ isLoading: true, error: null });
        try {
            const res = await notificationBarService.update(id, data);
            if (res.ok) {
                const updated = await notificationBarService.getAll();
                set({ notifications: updated.data || [], isLoading: false });
                return true;
            }
            throw new Error(res.message);
        } catch (error: any) {
            set({ error: error.response?.data?.message || error.message || "Failed to update notification", isLoading: false });
            return false;
        }
    },

    removeNotification: async (id) => {
        set({ isLoading: true, error: null });
        try {
            const res = await notificationBarService.delete(id);
            if (res.ok) {
                set((state) => ({
                    notifications: state.notifications.filter((n) => n.id !== id),
                    isLoading: false,
                }));
                return true;
            }
            throw new Error(res.message);
        } catch (error: any) {
            set({ error: error.response?.data?.message || error.message || "Failed to delete notification", isLoading: false });
            return false;
        }
    },
}));
