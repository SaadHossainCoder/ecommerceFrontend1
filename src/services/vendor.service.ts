import { api } from "@/lib/axios";

export interface VendorImage {
    url?: string;
    public_url?: string;
}

export interface CreateVendorData {
    name: string;
    slug: string;
    description: string;
    longDescription: string;
    vendorProductType: string;
    images: VendorImage[];
    descriptionImages: VendorImage[];
}

export interface UpdateVendorData {
    name?: string;
    slug?: string;
    description?: string;
    longDescription?: string;
    vendorProductType?: string;
    images?: VendorImage[];
    descriptionImages?: VendorImage[];
}

export interface Vendor {
    id: string;
    name: string;
    slug: string;
    description: string;
    longDescription: string;
    vendorProductType: string;
    images: string[];
    descriptionImages: string[];
    createdAt: string;
    updatedAt: string;
}

export const vendorService = {
    // GET /vendor — Public
    getAllVendors: async (): Promise<{ ok: boolean; message: string; data: Vendor[] }> => {
        const response = await api.get("vendor");
        return response.data;
    },

    //GET/vendor/short
    getVendorByShotData: async (): Promise<{ ok: boolean; message: string; data: Vendor[] }> => {
        const response = await api.get("vendor/short-data");
        return response.data;
    },

    // GET /vendor/:id — Public
    getVendorById: async (id: string): Promise<{ ok: boolean; message: string; data: Vendor }> => {
        const response = await api.get(`vendor/${id}`);
        return response.data;
    },

    // GET /vendor/slug/:slug — Public
    getVendorBySlug: async (slug: string): Promise<{ ok: boolean; message: string; data: Vendor }> => {
        const response = await api.get(`vendor/slug/${slug}`);
        return response.data;
    },

    // POST /vendor — Admin only
    createVendor: async (data: CreateVendorData): Promise<{ ok: boolean; message: string; data: Vendor }> => {
        const response = await api.post("vendor", data);
        return response.data;
    },

    // PUT /vendor/:id — Admin only
    updateVendor: async (id: string, data: UpdateVendorData): Promise<{ ok: boolean; message: string; data: Vendor }> => {
        const response = await api.put(`vendor/${id}`, data);
        return response.data;
    },

    // DELETE /vendor/:id — Admin only
    deleteVendor: async (id: string): Promise<{ ok: boolean; message: string; data: Vendor }> => {
        const response = await api.delete(`vendor/${id}`);
        return response.data;
    },
};
