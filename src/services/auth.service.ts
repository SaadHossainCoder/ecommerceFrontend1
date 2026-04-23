import { api } from "@/lib/axios";
import {
    LoginFormValues,
    SignupFormValues,
    ForgotPasswordFormValues,
    ResetPasswordFormValues,
    UpdateProfileFormValues,
    // OtpFormValues
} from "@/validations/auth.validation";

export const authService = {
    signup: async (data: SignupFormValues & { role?: string }) => {
        const response = await api.post("auth/signup", {
            username: data.fullName, // Backend expects username
            email: data.email,
            password: data.password,
            role: data.role || "USER",
        });
        return response.data;
    },

    login: async (data: LoginFormValues) => {
        const response = await api.post("auth/login", {
            email: data.email,
            password: data.password,
        });

        return response.data;
    },

    logout: async () => {
        const response = await api.post("auth/logout");
        return response.data;
    },

    refresh: async () => {
        const response = await api.post("auth/refresh");
        return response.data;
    },

    forgotPassword: async (data: ForgotPasswordFormValues) => {
        const response = await api.post("auth/forgot", data);
        return response.data;
    },

    resetPassword: async (data: ResetPasswordFormValues & { uid: string; token: string }) => {
        const response = await api.post("auth/reset", {
            uid: data.uid,
            token: data.token,
            password: data.password,
            confirmPassword: data.confirmPassword,
        });
        return response.data;
    },

    verifyEmail: async (data: { uid: string; token: string }) => {
        const response = await api.post("auth/verify", data);
        return response.data;
    },

    sendOtp: async (uid: string) => {
        const response = await api.post("auth/otp/send", { uid });
        return response.data;
    },

    verifyOtp: async (uid: string, otp: string) => {
        const response = await api.post("auth/otp/verify", { uid, otp });
        return response.data;
    },

    getMe: async () => {
        const response = await api.get("auth/me");
        return response.data;
    },

    authguard: async () => {
        const response = await api.get("auth/auth-guard");
        return response.data;
    },

    profileUpdate: async (data: UpdateProfileFormValues) => {
        const response = await api.put("auth/me", data);
        return response.data;
    },
};
