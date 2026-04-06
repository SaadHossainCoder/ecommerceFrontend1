import { create } from "zustand";
import { bannerService, Banner, CreateBannerData, UpdateBannerData } from "@/services/banner.service";

interface BannerStoreState {
    banners: Banner[];
    isLoading: boolean;
    error: string | null;
    fetchBanners: (force?: boolean) => Promise<void>;
    addBanner: (data: CreateBannerData) => Promise<boolean>;
    editBanner: (id: string, data: UpdateBannerData) => Promise<boolean>;
    removeBanner: (id: string) => Promise<boolean>;
}

export const useBannerStore = create<BannerStoreState>((set, get) => ({
    banners: [],
    isLoading: false,
    error: null,

    fetchBanners: async (force = false) => {
        if (!force && get().banners.length > 0) return;

        set({ isLoading: true, error: null });
        try {
            const res = await bannerService.getAllBanners();
            set({ banners: res.data || [], isLoading: false });
        } catch (error: any) {
            set({ error: error.response?.data?.message || error.message || "Failed to fetch banners", isLoading: false });
        }
    },

    addBanner: async (data) => {
        set({ isLoading: true, error: null });
        try {
            const res = await bannerService.createBanner(data);
            if (res.ok) {
                const updated = await bannerService.getAllBanners();
                set({ banners: updated.data || [], isLoading: false });
                return true;
            }
            throw new Error(res.message);
        } catch (error: any) {
            set({ error: error.response?.data?.message || error.message || "Failed to add banner", isLoading: false });
            return false;
        }
    },

    editBanner: async (id, data) => {
        set({ isLoading: true, error: null });
        try {
            const res = await bannerService.updateBanner(id, data);
            if (res.ok) {
                const updated = await bannerService.getAllBanners();
                set({ banners: updated.data || [], isLoading: false });
                return true;
            }
            throw new Error(res.message);
        } catch (error: any) {
            set({ error: error.response?.data?.message || error.message || "Failed to update banner", isLoading: false });
            return false;
        }
    },

    removeBanner: async (id) => {
        set({ isLoading: true, error: null });
        try {
            const res = await bannerService.deleteBanner(id);
            if (res.ok) {
                set((state) => ({
                    banners: state.banners.filter((b) => b.id !== id),
                    isLoading: false,
                }));
                return true;
            }
            throw new Error(res.message);
        } catch (error: any) {
            set({ error: error.response?.data?.message || error.message || "Failed to delete banner", isLoading: false });
            return false;
        }
    },
}));
