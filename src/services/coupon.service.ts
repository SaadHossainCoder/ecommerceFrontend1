import { api } from "@/lib/axios";

export interface Coupon {
    id: string;
    code: string;
    description?: string;
    discountType: "PERCENTAGE" | "FIXED";
    discountValue: number;
    maxDiscountAmount?: number | null;
    minPurchaseAmount?: number | null;
    validFrom: string;
    validUntil: string;
    usageLimit?: number | null;
    usedCount: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface CouponStats {
    totalUsage: number;
    activeCampaigns: number;
    totalSavings: number;
}

export const couponService = {
    getAllCoupons: async () => {
        const response = await api.get<{ ok: boolean; data: Coupon[] }>("/coupons");
        return response.data;
    },

    getCouponById: async (id: string) => {
        const response = await api.get<{ ok: boolean; data: Coupon }>(`/coupons/${id}`);
        return response.data;
    },

    // Assume there is a stats endpoint, if not we will calculate in store
    getStats: async () => {
        const response = await api.get<{ ok: boolean; data: CouponStats }>("/coupons/admin/stats");
        return response.data;
    },

    createCoupon: async (data: any) => {
        const response = await api.post<{ ok: boolean; data: Coupon }>("/coupons", data);
        return response.data;
    },

    updateCoupon: async (id: string, data: any) => {
        const response = await api.put<{ ok: boolean; data: Coupon }>(`/coupons/${id}`, data);
        return response.data;
    },

    deleteCoupon: async (id: string) => {
        const response = await api.delete<{ ok: boolean; message: string }>(`/coupons/${id}`);
        return response.data;
    },

    validateCoupon: async (code: string) => {
        const response = await api.post<{ ok: boolean; data: Coupon }>("/coupons/validate", { code });
        return response.data;
    }
};
