"use client";

import { Link as LinkIcon, ToggleRight, ToggleLeft } from "lucide-react";
import { UseFormRegister, UseFormHandleSubmit, FieldErrors } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { NotificationFormData } from "@/validations/notification.validation";

interface NotificationFormProps {
    register: UseFormRegister<NotificationFormData>;
    handleSubmit: UseFormHandleSubmit<NotificationFormData>;
    onSubmit: (data: NotificationFormData) => Promise<void>;
    errors: FieldErrors<NotificationFormData>;
    watchedIsActive: boolean;
    setValue: (name: keyof NotificationFormData, value: any, options?: any) => void;
}

export const NotificationForm = ({
    register,
    handleSubmit,
    onSubmit,
    errors,
    watchedIsActive,
    setValue,
}: NotificationFormProps) => {
    return (
        <form id="notif-form" onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-2">
            <div className="grid gap-2">
                <Label htmlFor="n-title">Title <span className="text-destructive">*</span></Label>
                <Input id="n-title" placeholder="e.g. Free Shipping on orders over ₹999!" {...register("title")} className={errors.title ? "border-destructive" : ""} />
                {errors.title && <p className="text-xs text-destructive">{errors.title.message}</p>}
            </div>

            <div className="grid gap-2">
                <Label htmlFor="n-msg">Message <span className="text-destructive">*</span></Label>
                <textarea
                    id="n-msg"
                    rows={3}
                    placeholder="Short announcement text (min 5 chars)"
                    {...register("message")}
                    className={`flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none ${errors.message ? "border-destructive" : ""}`}
                />
                {errors.message && <p className="text-xs text-destructive">{errors.message.message}</p>}
            </div>

            <div className="grid gap-2">
                <Label htmlFor="n-link">Link URL <span className="text-muted-foreground text-xs font-normal">(optional)</span></Label>
                <div className="relative">
                    <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="n-link" className="pl-9" placeholder="https://yourstore.com/sale" {...register("link")} />
                </div>
                {errors.link && <p className="text-xs text-destructive">{errors.link.message}</p>}
            </div>

            <div className="flex items-center justify-between rounded-xl border px-4 py-3 bg-muted/30">
                <div>
                    <p className="text-sm font-medium">Active Status</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                        {watchedIsActive ? "Visible to all visitors" : "Hidden from store front"}
                    </p>
                </div>
                <button
                    type="button"
                    onClick={() => setValue("isActive", !watchedIsActive)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                        watchedIsActive
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-muted text-muted-foreground"
                    }`}
                >
                    {watchedIsActive ? <ToggleRight className="h-4 w-4" /> : <ToggleLeft className="h-4 w-4" />}
                    {watchedIsActive ? "Active" : "Inactive"}
                </button>
            </div>
        </form>
    );
};
