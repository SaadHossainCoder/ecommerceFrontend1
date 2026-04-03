import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

const API_URL =
    process.env.NEXT_PUBLIC_API_URL ;

export const api = axios.create({
    baseURL: API_URL,
    withCredentials: true, // 🍪 cookies auto sent
    headers: {
        "Content-Type": "application/json",
    },
});

// Extend request type to include _retry
interface CustomRequest extends InternalAxiosRequestConfig {
    _retry?: boolean;
}

// 🔁 RESPONSE INTERCEPTOR
api.interceptors.response.use(
    (res) => res,

    async (error: AxiosError) => {
        const originalRequest = error.config as CustomRequest;

        if (!originalRequest) {
            return Promise.reject(error);
        }

        const isRefreshRequest =
            originalRequest.url?.includes("/auth/refresh");

        // 🔥 MAIN LOGIC
        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            !isRefreshRequest
        ) {
            originalRequest._retry = true;

            try {
                // 🔁 Call refresh endpoint (cookie auto sent)
                await api.post("/auth/refresh");

                // ✅ Retry original request
                return api(originalRequest);
            } catch (refreshError) {
                console.error("Refresh failed:", refreshError);

                // 🚨 Redirect to login (client-side only)
                // if (typeof window !== "undefined") {
                //   window.location.href = "/auth/login-popup";
                // }

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);