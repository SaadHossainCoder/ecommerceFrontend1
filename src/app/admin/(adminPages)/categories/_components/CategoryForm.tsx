"use client";

import { UseFormRegister, UseFormHandleSubmit, FieldErrors } from "react-hook-form";
import { RefreshCw, Link2, Unlink, LayoutGrid, Tag } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CategoryFormData } from "@/validations/category.validation";

interface CategoryFormProps {
    register: UseFormRegister<CategoryFormData>;
    handleSubmit: UseFormHandleSubmit<CategoryFormData>;
    onSubmit: (data: CategoryFormData) => Promise<void>;
    errors: FieldErrors<CategoryFormData>;
    isSlugSynced: boolean;
    setIsSlugSynced: (val: boolean) => void;
    handleSyncSlug: () => void;
    type: "main" | "sub";
}

export const CategoryForm = ({
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSlugSynced,
    setIsSlugSynced,
    handleSyncSlug,
    type,
}: CategoryFormProps) => {
    return (
        <form id="category-form" onSubmit={handleSubmit(onSubmit)} className="space-y-8 py-2">
            <div className="grid gap-2">
                <Label htmlFor="cat-name" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Category Name <span className="text-destructive">*</span></Label>
                <div className="relative">
                    {type === "main" ? (
                        <LayoutGrid className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    ) : (
                        <Tag className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    )}
                    <Input 
                        id="cat-name" 
                        placeholder={type === "main" ? "e.g. Electronics" : "e.g. Smartphones"} 
                        className={`pl-12 h-14 rounded-2xl bg-muted/40 border-primary/10 hover:bg-background focus:bg-background transition-colors text-base font-medium shadow-sm ${errors.name ? "border-destructive focus-visible:ring-destructive" : ""}`} 
                        {...register("name")} 
                    />
                </div>
                {errors.name && <p className="text-[10px] uppercase font-bold text-destructive mt-1">{errors.name.message}</p>}
            </div>

            <div className="grid gap-2">
                <div className="flex items-center justify-between">
                    <Label htmlFor="cat-slug" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">URL Slug <span className="text-destructive">*</span></Label>
                    <button 
                        type="button" 
                        onClick={handleSyncSlug}
                        className="text-[10px] text-primary bg-primary/5 hover:bg-primary/20 px-3 py-1.5 rounded-full flex items-center gap-1.5 font-bold transition-colors uppercase tracking-wider"
                        title="Sync with name"
                    >
                        <RefreshCw className="h-3 w-3" /> Auto-sync
                    </button>
                </div>
                <div className="relative">
                    <Input 
                        id="cat-slug" 
                        placeholder="url-friendly-slug" 
                        {...register("slug")} 
                        className={`font-mono h-14 pl-5 pr-12 rounded-2xl bg-muted/40 border-primary/10 hover:bg-background focus:bg-background transition-colors shadow-sm ${errors.slug ? "border-destructive" : ""}`} 
                        onChange={() => setIsSlugSynced(false)} 
                    />
                    {isSlugSynced ? (
                         <Link2 className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary opacity-60" />
                    ) : (
                         <Unlink className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground opacity-40" />
                    )}
                </div>
                {errors.slug && <p className="text-[10px] uppercase font-bold text-destructive mt-1">{errors.slug.message}</p>}
            </div>

            <div className="grid gap-2">
                <Label htmlFor="cat-icon" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Category Icon</Label>
                <div className="flex items-center gap-5">
                    <Input 
                        id="cat-icon" 
                        placeholder="📁" 
                        maxLength={2} 
                        className="w-20 h-20 rounded-3xl text-center text-4xl bg-muted/40 border-primary/10 hover:bg-background focus:bg-background transition-colors shadow-sm" 
                        {...register("icon")} 
                    />
                    <div className="flex flex-col">
                        <span className="font-bold text-sm text-foreground">Emoji Graphic</span>
                        <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">Select a visually distinct emoji to represent this taxonomy across the interface.</p>
                    </div>
                </div>
                {errors.icon && <p className="text-[10px] uppercase font-bold text-destructive mt-1">{errors.icon.message}</p>}
            </div>

            <div className="flex items-center justify-between rounded-3xl border border-primary/10 p-5 bg-muted/20 shadow-inner">
                <div className="flex flex-col">
                    <span className="font-bold text-sm text-foreground">Featured Priority</span>
                    <span className="text-xs text-muted-foreground mt-1 max-w-[220px] leading-relaxed">Forcefully push this category onto the storefront landing page</span>
                </div>
                <input
                    type="checkbox"
                    className="h-6 w-6 rounded border-primary/30 text-primary focus:ring-primary cursor-pointer hover:scale-110 transition-transform shadow-sm"
                    {...register("featured")}
                />
            </div>
        </form>
    );
};