"use client";

import { ImageIcon, Link as LinkIcon } from "lucide-react";
import { UseFormRegister, UseFormHandleSubmit, FieldErrors } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { BannerFormData } from "@/validations/banner.validation";

type BannerType = "HOME" | "CATEGORY" | "PRODUCT";

const BANNER_TYPES: BannerType[] = ["HOME", "CATEGORY", "PRODUCT"];

const TYPE_STYLES: Record<BannerType, { label: string; color: string }> = {
    HOME: { label: "Home", color: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400" },
    CATEGORY: { label: "Category", color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" },
    PRODUCT: { label: "Product", color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" },
};

interface BannerFormProps {
    register: UseFormRegister<BannerFormData>;
    handleSubmit: UseFormHandleSubmit<BannerFormData>;
    onSubmit: (data: BannerFormData) => Promise<void>;
    errors: FieldErrors<BannerFormData>;
    watchedImage: string;
    watchedType: BannerType;
    setValue: (name: keyof BannerFormData, value: any, options?: any) => void;
}

export const BannerForm = ({
    register,
    handleSubmit,
    onSubmit,
    errors,
    watchedImage,
    watchedType,
    setValue,
}: BannerFormProps) => {
    return (
        <form id="banner-form" onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-2">
            <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="b-title">Title <span className="text-destructive">*</span></Label>
                    <Input id="b-title" placeholder="e.g. Summer Sale" {...register("title")} className={errors.title ? "border-destructive" : ""} />
                    {errors.title && <p className="text-xs text-destructive">{errors.title.message}</p>}
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="b-slug">Slug <span className="text-destructive">*</span></Label>
                    <Input id="b-slug" placeholder="summer-sale" {...register("slug")} className={errors.slug ? "border-destructive" : "font-mono text-xs"} />
                    {errors.slug && <p className="text-xs text-destructive">{errors.slug.message}</p>}
                </div>
            </div>

            <div className="grid gap-2">
                <Label htmlFor="b-desc">Description <span className="text-destructive">*</span></Label>
                <textarea
                    id="b-desc"
                    rows={3}
                    placeholder="Short promotional text for this banner (min 10 chars)"
                    {...register("description")}
                    className={`flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none ${errors.description ? "border-destructive" : ""}`}
                />
                {errors.description && <p className="text-xs text-destructive">{errors.description.message}</p>}
            </div>

            <div className="grid gap-2">
                <Label htmlFor="b-img">Image URL <span className="text-destructive">*</span></Label>
                <div className="relative">
                    <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="b-img" className={`pl-9 ${errors.image ? "border-destructive" : ""}`} placeholder="https://..." {...register("image")} />
                </div>
                {errors.image && <p className="text-xs text-destructive">{errors.image.message}</p>}
                
                {watchedImage && !errors.image && (
                    <div className="relative h-28 w-full rounded-lg overflow-hidden border bg-muted mt-1">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={watchedImage}
                            alt="Banner preview"
                            className="h-full w-full object-cover"
                            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center -z-10">
                            <span className="text-xs text-muted-foreground">Preview</span>
                        </div>
                    </div>
                )}
            </div>

            <div className="grid gap-2">
                <Label htmlFor="b-link">Link URL <span className="text-destructive">*</span></Label>
                <div className="relative">
                    <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="b-link" className={`pl-9 ${errors.link ? "border-destructive" : ""}`} placeholder="https://yourstore.com/sale" {...register("link")} />
                </div>
                {errors.link && <p className="text-xs text-destructive">{errors.link.message}</p>}
            </div>

            <div className="grid gap-2">
                <Label>Banner Type</Label>
                <div className="flex gap-2 flex-wrap">
                    {BANNER_TYPES.map((t) => (
                        <button
                            key={t}
                            type="button"
                            onClick={() => setValue("type", t, { shouldValidate: true })}
                            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
                                watchedType === t
                                    ? "border-primary bg-primary text-primary-foreground shadow-sm"
                                    : "border-border hover:border-primary/50 text-muted-foreground"
                            }`}
                        >
                            {TYPE_STYLES[t].label}
                        </button>
                    ))}
                </div>
                {errors.type && <p className="text-xs text-destructive">{errors.type.message}</p>}
            </div>
        </form>
    );
};
