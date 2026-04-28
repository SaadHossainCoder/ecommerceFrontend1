import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { toast } from "@/components/ui/toaster";
// ─── Validate env ─────────────────────────────────────────────────────────────

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not defined in environment variables");
}

// ─── Axios instance ───────────────────────────────────────────────────────────

export const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

// ─── Types ────────────────────────────────────────────────────────────────────

interface RetryableRequest extends InternalAxiosRequestConfig {
    _retry?: boolean;
}

// ─── Response interceptor ─────────────────────────────────────────────────────

api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const request = error.config as RetryableRequest | undefined;

        if (!request) {
            return Promise.reject(error);
        }

        const isUnauthorized   = error.response?.status === 401;
        const isFirstAttempt   = !request._retry;
        const isRefreshEndpoint = request.url?.includes("/auth/refresh") ?? false;

        if (isUnauthorized && isFirstAttempt && !isRefreshEndpoint) {
            request._retry = true;

            try {
                await api.post("/auth/refresh");
                return api(request);
            } catch (refreshError) {
                if (typeof window !== "undefined") {
                    window.location.href = "/auth/login";
                }
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);