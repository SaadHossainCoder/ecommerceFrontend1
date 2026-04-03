"use client";

import { useEffect, useState } from "react";
import {
    Toast,
    ToastClose,
    ToastDescription,
    ToastProvider,
    ToastTitle,
    ToastViewport,
    ToastIcon,
} from "@/components/ui/toast";

export type ToastType =
    | "default"
    | "success"
    | "destructive"
    | "warning"
    | "info";

interface ToastItem {
    id: string;
    title?: string;
    description?: string;
    variant?: ToastType;
    duration?: number;
    action?: React.ReactNode;
    onClick?: () => void;
}

let toastListeners: Array<(toast: ToastItem) => void> = [];
let toastId = 0;

// 🔥 Trigger toast
export function toast({
    title,
    description,
    variant = "default",
    duration = 4000,
    action,
    onClick,
}: {
    title?: string;
    description?: string;
    variant?: ToastType;
    duration?: number;
    action?: React.ReactNode;
    onClick?: () => void;
}) {
    const id = String(toastId++);
    const newToast: ToastItem = { id, title, description, variant, duration, action, onClick };
    toastListeners.forEach((listener) => listener(newToast));
}

// 🎨 WHITE UI STYLE
function getToastStyle(variant: ToastType = "default") {
    const base =
        "bg-white border shadow-lg text-sm backdrop-blur-none";

    const map = {
        success: "border-l-4 border-green-500 text-green-700",
        destructive: "border-l-4 border-red-500 text-red-700",
        warning: "border-l-4 border-yellow-500 text-yellow-700",
        info: "border-l-4 border-blue-500 text-blue-700",
        default: "border-l-4 border-gray-400 text-gray-800",
    };

    return `${base} ${map[variant]}`;
}

export function Toaster() {
    const [toasts, setToasts] = useState<ToastItem[]>([]);

    useEffect(() => {
        const listener = (toast: ToastItem) => {
            setToasts((prev) => [...prev, toast]);
        };

        toastListeners.push(listener);

        return () => {
            toastListeners = toastListeners.filter((l) => l !== listener);
        };
    }, []);

    const removeToast = (id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    return (
        <ToastProvider>
            {toasts.map((t) => (
                <Toast
                    key={t.id}
                    duration={t.duration}
                    onOpenChange={(open) => {
                        if (!open) removeToast(t.id);
                    }}
                    className={`
            group relative flex items-start gap-4 p-4 pr-10
            rounded-xl border shadow-md
            transition-all duration-200 ease-out
            animate-toast-in
            ${getToastStyle(t.variant)}
        `}
                >
                    {/* ICON */}
                    <div className="mt-1">
                        <ToastIcon variant={t.variant} />
                    </div>

                    {/* CONTENT */}
                    <div className="flex flex-col gap-1">
                        {t.title && (
                            <ToastTitle className="font-semibold text-sm">
                                {t.title}
                            </ToastTitle>
                        )}
                        {t.description && (
                            <ToastDescription className="text-xs text-gray-500">
                                {t.description}
                            </ToastDescription>
                        )}
                        {t.action && (
                            <div className="mt-2" onClick={(e) => {
                                e.stopPropagation();
                                t.onClick?.();
                                removeToast(t.id);
                            }}>
                                {t.action}
                            </div>
                        )}
                    </div>

                    {/* CLOSE */}
                    <ToastClose className="absolute right-2 top-2 text-gray-400 hover:text-gray-700 transition" />
                </Toast>
            ))}

            {/* VIEWPORT */}
            <ToastViewport className="fixed top-5 right-5 z-[100] flex flex-col gap-3 w-[350px] max-w-[90vw]" />
        </ToastProvider>
    );
}