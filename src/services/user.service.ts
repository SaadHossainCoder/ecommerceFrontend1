import { api } from "@/lib/axios";

export const userService = {
    getAllUsers: async () => {
        const response = await api.get("auth/users");
        return response.data;
    },
    updateUserById: async (id: string, data: any) => {
        const response = await api.put(`auth/user/${id}`, data);
        return response.data;
    },
    deleteUserById: async (id: string) => {
        const response = await api.delete(`auth/user/${id}`);
        return response.data;
    },
    sendEmailToUser: async (id: string, subject: string, message: string) => {
        const response = await api.post(`auth/user/${id}/email`, { subject, message });
        return response.data;
    }
};
