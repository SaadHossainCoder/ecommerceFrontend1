import { create } from "zustand";
import { addressService, Address, CreateAddressData, UpdateAddressData } from "@/services/address.service";

interface AddressState {
    addresses: Address[];
    isLoading: boolean;
    error: string | null;

    // Actions
    fetchAddresses: () => Promise<void>;
    addAddress: (data: CreateAddressData) => Promise<void>;
    updateAddress: (id: string, data: UpdateAddressData) => Promise<void>;
    deleteAddress: (id: string) => Promise<void>;
    setDefault: (id: string) => Promise<void>;
}

export const useAddressStore = create<AddressState>((set, get) => ({
    addresses: [],
    isLoading: false,
    error: null,

    fetchAddresses: async () => {
        set({ isLoading: true, error: null });
        try {
            const { data } = await addressService.getAddresses();
            set({ addresses: data, isLoading: false });
        } catch (error: any) {
            set({ error: error?.message || "Failed to fetch addresses", isLoading: false });
        }
    },

    addAddress: async (data: CreateAddressData) => {
        set({ isLoading: true, error: null });
        try {
            const { data: newAddress } = await addressService.createAddress(data);
            set((state) => ({ 
                addresses: [...state.addresses, newAddress],
                isLoading: false 
            }));
            // Refresh to ensure ordering/default status is correct
            await get().fetchAddresses();
        } catch (error: any) {
            set({ error: error?.message || "Failed to add address", isLoading: false });
            throw error;
        }
    },

    updateAddress: async (id: string, data: UpdateAddressData) => {
        set({ isLoading: true, error: null });
        try {
            await addressService.updateAddress(id, data);
            await get().fetchAddresses();
        } catch (error: any) {
            set({ error: error?.message || "Failed to update address", isLoading: false });
            throw error;
        }
    },

    deleteAddress: async (id: string) => {
        set({ isLoading: true, error: null });
        try {
            await addressService.deleteAddress(id);
            set((state) => ({
                addresses: state.addresses.filter(a => a.id !== id),
                isLoading: false
            }));
        } catch (error: any) {
            set({ error: error?.message || "Failed to delete address", isLoading: false });
            throw error;
        }
    },

    setDefault: async (id: string) => {
        set({ isLoading: true, error: null });
        try {
            await addressService.setDefaultAddress(id);
            await get().fetchAddresses();
        } catch (error: any) {
            set({ error: error?.message || "Failed to set default address", isLoading: false });
            throw error;
        }
    }
}));
