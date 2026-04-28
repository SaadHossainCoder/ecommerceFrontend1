import { create } from "zustand";
import { vendorService, Vendor, CreateVendorData, UpdateVendorData } from "@/services/vendor.service";

interface VendorStoreState {
    vendors: Vendor[];
    isLoading: boolean;
    error: string | null;
    fetchVendors: (force?: boolean) => Promise<void>;
    addVendor: (data: any) => Promise<boolean>;
    editVendor: (id: string, data: any) => Promise<boolean>;
    removeVendor: (id: string) => Promise<boolean>;
    VendorsByShortData: (force?: boolean) => Promise<void>;
    fetchVendorBySlug: (slug: string) => Promise<void>;
}

export const useVendorStore = create<VendorStoreState>((set, get) => ({
    vendors: [],
    isLoading: false,
    error: null,

    fetchVendors: async (force = false) => {
        if (!force && get().vendors.length > 0) return;

        set({ isLoading: true, error: null });
        try {
            const res = await vendorService.getAllVendors();
            set({ vendors: res.data || [], isLoading: false });
        } catch (error: any) {
            set({ error: error.response?.data?.message || error.message || "Failed to fetch vendors", isLoading: false });
        }
    },
    fetchVendorBySlug: async (slug: string) => {
        set({ isLoading: true, error: null });
        try {
            const res = await vendorService.getVendorBySlug(slug);
            set({ vendors: res.data ? [res.data] : [], isLoading: false });
        } catch (error: any) {
            set({ error: error.response?.data?.message || error.message || "Failed to fetch vendor by slug", isLoading: false });
        }
    },

    VendorsByShortData: async (force = false) => {
        if (!force && get().vendors.length > 0) return;

        set({ isLoading: true, error: null });
        try {
            const res = await vendorService.getVendorByShotData();
            set({ vendors: res.data || [], isLoading: false });
        } catch (error: any) {
            set({ error: error.response?.data?.message || error.message || "Failed to fetch vendors", isLoading: false });
        }
    },

    addVendor: async (data) => {
        set({ isLoading: true, error: null });
        try {
            const formattedData: CreateVendorData = {
                ...data,
                // Handle object-based images from form
                images: (data.imageUrls || [])
                    .filter((i: any) => i && i.url.trim())
                    .map((i: any) => ({ url: i.url })),
                descriptionImages: (data.descImageUrls || [])
                    .filter((i: any) => i && i.url.trim())
                    .map((i: any) => ({ url: i.url })),
            };
            const res = await vendorService.createVendor(formattedData);
            if (res.ok) {
                const updated = await vendorService.getAllVendors();
                set({ vendors: updated.data || [], isLoading: false });
                return true;
            }
            throw new Error(res.message);
        } catch (error: any) {
            set({ error: error.response?.data?.message || error.message || "Failed to add vendor", isLoading: false });
            return false;
        }
    },

    editVendor: async (id, data) => {
        set({ isLoading: true, error: null });
        try {
            const formattedData: UpdateVendorData = {
                ...data,
                // Handle object-based images from form
                images: (data.imageUrls || [])
                    .filter((i: any) => i && i.url.trim())
                    .map((i: any) => ({ url: i.url })),
                descriptionImages: (data.descImageUrls || [])
                    .filter((i: any) => i && i.url.trim())
                    .map((i: any) => ({ url: i.url })),
            };
            const res = await vendorService.updateVendor(id, formattedData);
            if (res.ok) {
                const updated = await vendorService.getAllVendors();
                set({ vendors: updated.data || [], isLoading: false });
                return true;
            }
            throw new Error(res.message);
        } catch (error: any) {
            set({ error: error.response?.data?.message || error.message || "Failed to update vendor", isLoading: false });
            return false;
        }
    },

    removeVendor: async (id) => {
        set({ isLoading: true, error: null });
        try {
            const res = await vendorService.deleteVendor(id);
            if (res.ok) {
                set((state) => ({
                    vendors: state.vendors.filter((v) => v.id !== id),
                    isLoading: false,
                }));
                return true;
            }
            throw new Error(res.message);
        } catch (error: any) {
            set({ error: error.response?.data?.message || error.message || "Failed to delete vendor", isLoading: false });
            return false;
        }
    },
}));
