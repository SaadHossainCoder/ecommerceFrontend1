import { api } from "@/lib/axios";

export interface Address {
    id: string;
    name: string;
    phone: string;
    email?: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    label?: string;
    isDefault: boolean;
    addressType: "MY_ADDRESS" | "GIFT_ADDRESS";
    friendName?: string;
    friendPhone?: string;
    giftDescription?: string;
    createdAt: string;
}

export interface CreateAddressData {
    name: string;
    phone: string;
    email?: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    label?: string;
    isDefault?: boolean;
    addressType: "MY_ADDRESS" | "GIFT_ADDRESS";
    friendName?: string;
    friendPhone?: string;
    giftDescription?: string;
}

export type UpdateAddressData = Partial<CreateAddressData>;

// ─────────────────────────────────────────────────────────────────────────────
// Backend response shape: { ok: boolean, message: string, data: T }
// All URLs must NOT have a leading "/" — axios baseURL already ends with "/api"
// A leading "/" would bypass baseURL and hit http://host/addresses (missing /api)
// ─────────────────────────────────────────────────────────────────────────────

export const addressService = {
    // GET /api/addresses
    getAddresses: async (): Promise<{ data: Address[] }> => {
        const response = await api.get<{ ok: boolean; data: Address[]; message: string }>("addresses");
        return { data: response.data.data };
    },

    // GET /api/addresses/:id
    getAddressById: async (id: string): Promise<{ data: Address }> => {
        const response = await api.get<{ ok: boolean; data: Address; message: string }>(`addresses/${id}`);
        return { data: response.data.data };
    },

    // POST /api/addresses
    createAddress: async (data: CreateAddressData): Promise<{ data: Address; message: string }> => {
        const response = await api.post<{ ok: boolean; data: Address; message: string }>("addresses", data);
        return { data: response.data.data, message: response.data.message };
    },

    // PUT /api/addresses/:id   (backend uses PUT for full update, PATCH for partial)
    updateAddress: async (id: string, data: UpdateAddressData): Promise<{ data: Address; message: string }> => {
        const response = await api.put<{ ok: boolean; data: Address; message: string }>(`addresses/${id}`, data);
        return { data: response.data.data, message: response.data.message };
    },

    // DELETE /api/addresses/:id
    deleteAddress: async (id: string): Promise<{ message: string }> => {
        const response = await api.delete<{ ok: boolean; message: string }>(`addresses/${id}`);  // ✅ no leading /
        return { message: response.data.message };
    },

    // PATCH /api/addresses/:id/default   ← backend route is /default not /set-default
    setDefaultAddress: async (id: string): Promise<{ message: string }> => {
        const response = await api.patch<{ ok: boolean; message: string }>(`addresses/${id}/default`);  // ✅ fixed URL
        return { message: response.data.message };
    },
};