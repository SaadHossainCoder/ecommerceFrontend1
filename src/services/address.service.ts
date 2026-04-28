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

export const addressService = {
    getAddresses: async () => {
        const response = await api.get<{ data: Address[] }>("addresses");
        return response.data;
    },

    getAddressById: async (id: string) => {
        const response = await api.get<{ data: Address }>(`addresses/${id}`);
        return response.data;
    },

    createAddress: async (data: CreateAddressData) => {
        const response = await api.post<{ data: Address; message: string }>("addresses", data);
        return response.data;
    },

    updateAddress: async (id: string, data: UpdateAddressData) => {
        const response = await api.patch<{ data: Address; message: string }>(`addresses/${id}`, data);
        return response.data;
    },

    deleteAddress: async (id: string) => {
        const response = await api.delete<{ message: string }>(`/addresses/${id}`);
        return response.data;
    },

    setDefaultAddress: async (id: string) => {
        const response = await api.patch<{ message: string }>(`/addresses/${id}/set-default`);
        return response.data;
    }
};