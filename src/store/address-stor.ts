import { create } from "zustand";
import { addressService, Address, CreateAddressData, UpdateAddressData } from "@/services/address.service";
import axios from "axios";

interface AddressState {
    addresses: Address[];
    selectedAddress: Address | null;
    isLoading: boolean;
    error: string | null;

    // Actions
    fetchAddresses: () => Promise<void>;
    fetchAddressesById: (id: string) => Promise<void>;
    addAddress: (data: CreateAddressData) => Promise<void>;
    updateAddress: (id: string, data: UpdateAddressData) => Promise<void>;
    deleteAddress: (id: string) => Promise<void>;
    setDefault: (id: string) => Promise<void>;
    setSelectedAddress: (address: Address | null) => void;
}

// ─── Extract a readable message from any error (Axios or plain) ──────────────
const extractError = (error: unknown): string => {
    if (axios.isAxiosError(error)) {
        // Backend { ok: false, message: "..." }
        return error.response?.data?.message || error.message || "Request failed";
    }
    if (error instanceof Error) return error.message;
    return "An unexpected error occurred";
};

export const useAddressStore = create<AddressState>((set, get) => ({
    addresses: [],
    selectedAddress: null,
    isLoading: false,
    error: null,

    // ── GET all addresses ────────────────────────────────────────────────────
    fetchAddresses: async () => {
        set({ isLoading: true, error: null });
        try {
            const { data } = await addressService.getAddresses();
            set({ addresses: Array.isArray(data) ? data : [], isLoading: false });
        } catch (error) {
            set({ error: extractError(error), isLoading: false });
        }
    },

    // ── GET address by id ────────────────────────────────────────────────────
    fetchAddressesById: async (id: string) => {
        set({ isLoading: true, error: null });
        try {
            const { data } = await addressService.getAddressById(id);
            set({
                selectedAddress: data,
                addresses: get().addresses.map(a => a.id === id ? data : a),
                isLoading: false,
            });
        } catch (error) {
            set({ error: extractError(error), isLoading: false });
        }
    },

    setSelectedAddress: (address: Address | null) => set({ selectedAddress: address }),

    // ── CREATE address ───────────────────────────────────────────────────────
    addAddress: async (data: CreateAddressData) => {
        set({ isLoading: true, error: null });
        try {
            await addressService.createAddress(data);
            // Refresh full list to get correct ordering + default flag
            await get().fetchAddresses();
        } catch (error) {
            set({ error: extractError(error), isLoading: false });
            throw error;
        }
    },

    // ── UPDATE address ───────────────────────────────────────────────────────
    updateAddress: async (id: string, data: UpdateAddressData) => {
        set({ isLoading: true, error: null });
        try {
            await addressService.updateAddress(id, data);
            await get().fetchAddresses(); // fetchAddresses sets isLoading: false
        } catch (error) {
            set({ error: extractError(error), isLoading: false }); // always reset loading
            throw error;
        }
    },

    // ── DELETE address (optimistic UI) ───────────────────────────────────────
    deleteAddress: async (id: string) => {
        // Optimistic: remove from list immediately
        const prev = get().addresses;
        set({ addresses: prev.filter(a => a.id !== id), isLoading: true, error: null });
        try {
            await addressService.deleteAddress(id);
            set({ isLoading: false });
        } catch (error) {
            // Rollback on failure
            set({ addresses: prev, error: extractError(error), isLoading: false });
            throw error;
        }
    },

    // ── SET DEFAULT ──────────────────────────────────────────────────────────
    setDefault: async (id: string) => {
        set({ isLoading: true, error: null });
        try {
            await addressService.setDefaultAddress(id);
            await get().fetchAddresses();
        } catch (error) {
            set({ error: extractError(error), isLoading: false });
            throw error;
        }
    },
}));
