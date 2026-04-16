"use client";

import { 
    X, 
    PlusCircle, 
    Link as LinkIcon, 
    FileImage, 
    ExternalLink, 
    RefreshCw, 
    Link2, 
    Unlink, 
    ImageIcon 
} from "lucide-react";
import { useFieldArray, UseFormRegister, Control, FieldErrors, UseFormHandleSubmit } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { VendorFormData } from "@/validations/vendor.validation";

// ─── Multi-URL Input Component ────────────────────────────────────────────────
export function MultiUrlFieldArray({
    label,
    name,
    control,
    register,
    errors,
    placeholder = "https://...",
}: {
    label: string;
    name: "imageUrls" | "descImageUrls";
    control: Control<VendorFormData>;
    register: UseFormRegister<VendorFormData>;
    errors: FieldErrors<VendorFormData>;
    placeholder?: string;
}) {
    const { fields, append, remove } = useFieldArray({
        control,
        name,
    });

    return (
        <div className="grid gap-2">
            <div className="flex items-center justify-between">
                <Label>{label}</Label>
                <button
                    type="button"
                    onClick={() => append({ url: "" })}
                    className="flex items-center gap-1 text-xs text-primary hover:underline"
                >
                    <PlusCircle className="h-3 w-3" /> Add URL
                </button>
            </div>
            <div className="space-y-2">
                {fields.map((field, i) => (
                    <div key={field.id} className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                            <div className="relative flex-1">
                                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                                <Input
                                    {...register(`${name}.${i}.url` as const)}
                                    placeholder={placeholder}
                                    className={`pl-8 text-sm ${errors?.[name]?.[i]?.url ? "border-destructive focus-visible:ring-destructive" : ""}`}
                                />
                            </div>
                            {fields.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => remove(i)}
                                    className="shrink-0 p-1 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            )}
                        </div>
                        {errors?.[name]?.[i]?.url && (
                            <p className="text-[10px] text-destructive ml-1">{errors[name]?.[i]?.url?.message}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

// ─── Image Gallery Preview ────────────────────────────────────────────────────
export function ImageGallery({ urls, label }: { urls: string[]; label: string }) {
    const valid = urls.filter((u) => u && u.trim().length > 0);
    if (valid.length === 0) return (
        <div className="flex flex-col items-center justify-center h-28 rounded-lg border-2 border-dashed text-muted-foreground text-xs gap-2">
            <FileImage className="h-6 w-6 opacity-40" />
            <span>No {label}</span>
        </div>
    );
    return (
        <div className="grid grid-cols-3 gap-2">
            {valid.map((url, i) => (
                <div key={i} className="aspect-square rounded-lg overflow-hidden border bg-muted relative group">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={url}
                        alt={`${label} ${i + 1}`}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                            const target = e.currentTarget as HTMLImageElement;
                            target.style.display = "none";
                            if (target.parentElement) {
                                const placeholder = document.createElement('div');
                                placeholder.className = "h-full w-full flex items-center justify-center text-muted-foreground text-[10px] p-1 text-center break-all";
                                placeholder.innerText = "Invalid Image";
                                target.parentElement.appendChild(placeholder);
                            }
                        }}
                    />
                    <a
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                        className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <ExternalLink className="h-4 w-4 text-white" />
                    </a>
                </div>
            ))}
        </div>
    );
}

interface VendorFormProps {
    register: UseFormRegister<VendorFormData>;
    handleSubmit: UseFormHandleSubmit<VendorFormData>;
    onSubmit: (data: VendorFormData) => Promise<void>;
    errors: FieldErrors<VendorFormData>;
    control: Control<VendorFormData>;
    isSlugSynced: boolean;
    setIsSlugSynced: (val: boolean) => void;
    handleSyncSlug: () => void;
    watchedImageUrls: { url: string }[];
    watchedDescImageUrls: { url: string }[];
}

export const VendorForm = ({
    register,
    handleSubmit,
    onSubmit,
    errors,
    control,
    isSlugSynced,
    setIsSlugSynced,
    handleSyncSlug,
    watchedImageUrls,
    watchedDescImageUrls,
}: VendorFormProps) => {
    return (
        <form id="vendor-form" onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-2">
            {/* Vendor Name */}
            <div className="grid gap-2">
                <Label htmlFor="v-name">Vendor Name <span className="text-destructive">*</span></Label>
                <Input 
                    id="v-name" 
                    placeholder="e.g. TechZone Supplies" 
                    {...register("name")} 
                    className={errors.name ? "border-destructive" : ""} 
                />
                {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
            </div>
            
            {/* Slug (Separate and Manually Editable) */}
            <div className="grid gap-2">
                <div className="flex items-center justify-between">
                    <Label htmlFor="v-slug">Slug <span className="text-destructive">*</span></Label>
                    <button 
                        type="button" 
                        onClick={handleSyncSlug}
                        className="text-[10px] text-primary hover:underline flex items-center gap-1"
                        title="Sync with name"
                    >
                        <RefreshCw className="h-2.5 w-2.5" /> Auto-sync
                    </button>
                </div>
                <div className="relative">
                    <Input 
                        id="v-slug" 
                        placeholder="url-friendly-slug" 
                        {...register("slug")} 
                        className={`font-mono text-sm ${errors.slug ? "border-destructive" : ""}`} 
                        onChange={() => setIsSlugSynced(false)} 
                    />
                    {isSlugSynced ? (
                         <Link2 className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-primary opacity-50" />
                    ) : (
                         <Unlink className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground opacity-50" />
                    )}
                </div>
                {errors.slug && <p className="text-xs text-destructive">{errors.slug.message}</p>}
                <p className="text-[10px] text-muted-foreground">Unique identifier used in URLs</p>
            </div>

            <div className="grid gap-2">
                <Label htmlFor="v-type">Product Type <span className="text-destructive">*</span></Label>
                <Input id="v-type" placeholder="e.g. Electronics, Fashion..." {...register("vendorProductType")} className={errors.vendorProductType ? "border-destructive" : ""} />
                {errors.vendorProductType && <p className="text-xs text-destructive">{errors.vendorProductType.message}</p>}
            </div>

            <div className="grid gap-2">
                <Label htmlFor="v-desc">Short Description <span className="text-destructive">*</span></Label>
                <textarea
                    id="v-desc"
                    rows={2}
                    placeholder="Briefly describe this vendor (min 10 chars)"
                    {...register("description")}
                    className={`flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none ${errors.description ? "border-destructive" : ""}`}
                />
                {errors.description && <p className="text-xs text-destructive">{errors.description.message}</p>}
            </div>

            <div className="grid gap-2">
                <Label htmlFor="v-long">Long Description <span className="text-destructive">*</span></Label>
                <textarea
                    id="v-long"
                    rows={3}
                    placeholder="Detailed description (min 20 chars)"
                    {...register("longDescription")}
                    className={`flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none ${errors.longDescription ? "border-destructive" : ""}`}
                />
                {errors.longDescription && <p className="text-xs text-destructive">{errors.longDescription.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <MultiUrlFieldArray
                    label="Vendor Images"
                    name="imageUrls"
                    control={control}
                    register={register}
                    errors={errors}
                />

                <MultiUrlFieldArray
                    label="Description Images"
                    name="descImageUrls"
                    control={control}
                    register={register}
                    errors={errors}
                />
            </div>
            
            {/* Live Preview for Images */}
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-2 pt-4 border-t">
                <div>
                     <p className="text-xs font-semibold text-muted-foreground mb-2">Live Preview (Vendor Images)</p>
                     <ImageGallery urls={watchedImageUrls?.map(i => i.url) || []} label="Vendor Image" />
                </div>
                <div>
                     <p className="text-xs font-semibold text-muted-foreground mb-2">Live Preview (Description Images)</p>
                     <ImageGallery urls={watchedDescImageUrls?.map(i => i.url) || []} label="Description Image" />
                </div>
             </div>
        </form>
    );
};