import { create } from "zustand";
import { 
    Coupon, 
    CouponStats, 
    couponService 
} from "@/services/coupon.service";

interface CouponStore {
    coupons: Coupon[];
    stats: CouponStats | null;
    isLoading: boolean;
    error: string | null;

    // Actions
    fetchCoupons: (refresh?: boolean) => Promise<void>;
    fetchStats: (refresh?: boolean) => Promise<void>;
    addCoupon: (data: any) => Promise<boolean>;
    editCoupon: (id: string, data: any) => Promise<boolean>;
    removeCoupon: (id: string) => Promise<boolean>;
}

export const useCouponStore = create<CouponStore>((set, get) => ({
    coupons: [],
    stats: null,
    isLoading: false,
    error: null,

    fetchCoupons: async (refresh = false) => {
        if (!refresh && get().coupons.length > 0) return;
        set({ isLoading: true, error: null });
        try {
            const result = await couponService.getAllCoupons();
            if (result.ok) set({ coupons: result.data });
        } catch (error: any) {
            set({ error: error.response?.data?.message || "Failed to fetch coupons" });
        } finally {
            set({ isLoading: false });
        }
    },

    fetchStats: async (refresh = false) => {
        if (!refresh && get().stats) return;
        set({ isLoading: true, error: null });
        try {
            const result = await couponService.getStats();
            if (result.ok) set({ stats: result.data });
        } catch (error: any) {
            // Silently fail or calculate manually if endpoint doesn't exist yet
            console.error(error);
        } finally {
            set({ isLoading: false });
        }
    },

    addCoupon: async (data) => {
        set({ isLoading: true, error: null });
        try {
            const result = await couponService.createCoupon(data);
            if (result.ok) {
                await Promise.all([get().fetchCoupons(true), get().fetchStats(true)]);
                return true;
            }
            return false;
        } catch (error: any) {
            set({ error: error.response?.data?.message || "Failed to create coupon" });
            return false;
        } finally {
            set({ isLoading: false });
        }
    },

    editCoupon: async (id, data) => {
        set({ isLoading: true, error: null });
        try {
            const result = await couponService.updateCoupon(id, data);
            if (result.ok) {
                await Promise.all([get().fetchCoupons(true), get().fetchStats(true)]);
                return true;
            }
            return false;
        } catch (error: any) {
            set({ error: error.response?.data?.message || "Failed to update coupon" });
            return false;
        } finally {
            set({ isLoading: false });
        }
    },

    removeCoupon: async (id) => {
        set({ isLoading: true, error: null });
        try {
            const result = await couponService.deleteCoupon(id);
            if (result.ok) {
                await Promise.all([get().fetchCoupons(true), get().fetchStats(true)]);
                return true;
            }
            return false;
        } catch (error: any) {
            set({ error: error.response?.data?.message || "Failed to remove coupon" });
            return false;
        } finally {
            set({ isLoading: false });
        }
    }
}));
