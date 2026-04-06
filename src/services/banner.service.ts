import { api } from "@/lib/axios";

export type BannerType = "HOME" | "CATEGORY" | "PRODUCT";

export interface Banner {
    id: string;
    title: string;
    description: string;
    image: string;
    link: string;
    type: BannerType;
    createdAt: string;
    updatedAt: string;
}

export interface CreateBannerData {
    title: string;
    description: string;
    image: string;
    link: string;
    type?: BannerType;
}

export interface UpdateBannerData {
    title?: string;
    description?: string;
    image?: string;
    link?: string;
    type?: BannerType;
}

export const bannerService = {
    // GET /banners — Public
    getAllBanners: async (): Promise<{ ok: boolean; message: string; data: Banner[] }> => {
        const response = await api.get("banners");
        return response.data;
    },

    // GET /banners/:id — Public
    getBannerById: async (id: string): Promise<{ ok: boolean; message: string; data: Banner }> => {
        const response = await api.get(`banners/${id}`);
        return response.data;
    },

    // POST /banners — Admin only
    createBanner: async (data: CreateBannerData): Promise<{ ok: boolean; message: string; data: Banner }> => {
        const response = await api.post("banners", data);
        return response.data;
    },

    // PUT /banners/:id — Admin only
    updateBanner: async (id: string, data: UpdateBannerData): Promise<{ ok: boolean; message: string; data: Banner }> => {
        const response = await api.put(`banners/${id}`, data);
        return response.data;
    },

    // DELETE /banners/:id — Admin only
    deleteBanner: async (id: string): Promise<{ ok: boolean; message: string; data: Banner }> => {
        const response = await api.delete(`banners/${id}`);
        return response.data;
    },
};
