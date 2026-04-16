"use client";

import { useForm, useFieldArray, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
    // ImageIcon,
    // Upload,
    Plus,
    Trash2,
    X,
    Link as LinkIcon,
    PlusCircle,
    FileImage,
    ExternalLink,
    Box,
    Filter,
    List,
    Loader2
} from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { productSchema, ProductFormValues } from "@/validations/addProduct.validation";
import { useCategoryStore } from "@/store/category-store";
import { useVendorStore } from "@/store/vendor-store";

interface EditProductFormProps {
    onClose?: () => void;
    onSave?: (data: ProductFormValues) => void;
    initialData?: any;
}

const vendorOptions = []; // No longer needed hardcoded

// Helper: Multi-URL Input Component (from Vendor pattern)
function MultiUrlInput({
    label,
    values,
    onChange,
    errors,
    placeholder = "https://...",
}: {
    label: string;
    values: string[];
    onChange: (newValues: string[]) => void;
    errors?: any;
    placeholder?: string;
}) {
    const addRow = () => onChange([...values, ""]);
    const removeRow = (i: number) => {
        const next = values.filter((_, idx) => idx !== i);
        onChange(next.length === 0 ? [""] : next);
    };
    const updateRow = (i: number, val: string) => {
        const next = [...values];
        next[i] = val;
        onChange(next);
    };

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <Label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">{label}</Label>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={addRow}
                    className="h-7 text-xs text-primary hover:text-primary hover:bg-primary/5 gap-1"
                >
                    <PlusCircle className="h-3 w-3" /> Add Image URL
                </Button>
            </div>
            <div className="space-y-2">
                {values.map((val, i) => (
                    <div key={i} className="group relative">
                        <div className="flex items-center gap-2">
                            <div className="relative flex-1">
                                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                <Input
                                    placeholder={placeholder}
                                    value={val}
                                    onChange={(e) => updateRow(i, e.target.value)}
                                    className="pl-9 h-10 bg-muted/30 focus-visible:bg-background border-dashed focus-visible:border-solid transition-all"
                                />
                            </div>
                            {values.length > 1 && (
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeRow(i)}
                                    className="h-10 w-10 text-muted-foreground hover:text-destructive hover:bg-destructive/5"
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            )}
                        </div>
                        {val && (
                            <div className="mt-2 w-20 h-20 rounded-lg overflow-hidden border bg-muted group-hover:shadow-md transition-shadow">
                                <img
                                    src={val}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        (e.currentTarget as HTMLImageElement).src = 'https://via.placeholder.com/150?text=Invalid';
                                    }}
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

// Helper: Tag/String Input for small values (e.g. Sizes)
function TagInput({
    label,
    values,
    onChange,
    placeholder = "e.g. XL",
}: {
    label: string;
    values: string[];
    onChange: (newValues: string[]) => void;
    placeholder?: string;
}) {
    const addRow = () => onChange([...values, ""]);
    const removeRow = (i: number) => {
        const next = values.filter((_, idx) => idx !== i);
        onChange(next.length === 0 ? [""] : next);
    };
    const updateRow = (i: number, val: string) => {
        const next = [...values];
        next[i] = val;
        onChange(next);
    };

    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{label}</Label>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={addRow}
                    className="h-5 text-[9px] text-primary hover:bg-primary/5 uppercase font-bold px-1"
                >
                    <Plus className="h-2.5 w-2.5 mr-1" /> Add
                </Button>
            </div>
            <div className="flex flex-wrap gap-2">
                {values.map((val, i) => (
                    <div key={i} className="flex items-center gap-1 bg-muted/50 pl-2 pr-1 py-1 rounded-md border border-stone-200">
                        <input
                            placeholder={placeholder}
                            value={val}
                            onChange={(e) => updateRow(i, e.target.value)}
                            className="bg-transparent border-none outline-none text-[10px] w-16 font-bold uppercase tracking-wider"
                        />
                        <button
                            type="button"
                            onClick={() => removeRow(i)}
                            className="text-muted-foreground hover:text-destructive transition-colors"
                        >
                            <X className="h-3 w-3" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function EditProductForm({
    onClose,
    onSave,
    initialData,
}: EditProductFormProps) {
    const { categoryTree, fetchTree } = useCategoryStore();
    const { vendors, fetchVendors } = useVendorStore();

    useEffect(() => {
        fetchTree();
        fetchVendors();
    }, [fetchTree, fetchVendors]);

    // Map initial images from objects to strings
    const initialImages = useMemo(() => {
        const imgs = initialData?.generalImages || initialData?.images;
        const mapped = Array.isArray(imgs) 
            ? imgs.map((img: any) => typeof img === 'string' ? img : img.url) 
            : [];
        return mapped.length > 0 ? mapped : [""];
    }, [initialData]);

    const defaultFormState = useMemo(() => ({
        title: initialData?.title || "",
        description: initialData?.description || "",
        longDescription: initialData?.longDescription || "",
        brand: initialData?.brand || initialData?.ingredients?.brand || "",
        vendor: typeof initialData?.vendor === 'object' ? initialData.vendor.id : initialData?.vendor || "",
        sku: initialData?.sku || "",
        slug: initialData?.slug || "",
        discount: initialData?.discount || 0,
        category: typeof initialData?.category === 'object' ? initialData.category.id : initialData?.category || "",
        subcategory: initialData?.subcategory || initialData?.ingredients?.subcategory || "",
        featured: initialData?.featured || false,
        disableProduct: initialData?.disableProduct || false,
        disableProductDate: initialData?.disableProductDate || null,
        subProducts: (initialData?.subProducts || initialData?.sizes)?.map((s: any) => ({
            sku: s.sku || "",
            type: s.type || s.size || "",
            qty: Number(s.qty || 0),
            price: Number(s.price || 0),
            images: Array.isArray(s.images) && s.images.length ? s.images : (s.image ? [s.image] : [""]),
            size: Array.isArray(s.size) ? s.size : (typeof s.size === 'string' ? [s.size] : [""])
        })) || [{ sku: "", type: "", qty: 0, price: 0, images: [""], size: [""] }],
        benefits: (Array.isArray(initialData?.benefits) ? initialData.benefits : (Array.isArray(initialData?.ingredients?.benefits) ? initialData.ingredients.benefits : [])).map((v: string) => ({ value: v })) || [{ value: "" }],
        ingredients: (Array.isArray(initialData?.ingredients) ? initialData.ingredients : (Array.isArray(initialData?.ingredients?.details) ? initialData.ingredients.details : [])).map((v: string) => ({ value: v })) || [{ value: "" }],
        generalImages: initialImages,
    }), [initialData, initialImages]);

    const {
        register,
        control,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { isSubmitting, errors },
    } = useForm<ProductFormValues>({
        resolver: zodResolver(productSchema),
        defaultValues: defaultFormState,
    });

    // Sync form with initialData if it changes (e.g. after fetch)
    useEffect(() => {
        if (initialData) {
            reset(defaultFormState);
        }
    }, [initialData, reset, defaultFormState]);

    const { fields: subProductFields, append: appendSubProduct, remove: removeSubProduct } = useFieldArray({ control, name: "subProducts" });
    const { fields: benefitFields, append: appendBenefit, remove: removeBenefit } = useFieldArray({ control, name: "benefits" });
    const { fields: ingredientFields, append: appendIngredient, remove: removeIngredient } = useFieldArray({ control, name: "ingredients" });

    const watchGeneralImages = watch("generalImages");
    const watchTitle = watch("title");

    useEffect(() => {
        if (!initialData?._id && !initialData?.id && watchTitle) {
            const generatedSlug = watchTitle
                .toLowerCase()
                .trim()
                .replace(/[^a-z0-9\s-]/g, "")
                .replace(/\s+/g, "-")
                .replace(/-+/g, "-");
            setValue("slug", generatedSlug, { shouldValidate: true });
        }
    }, [watchTitle, setValue, initialData]);

    const onSubmit: SubmitHandler<ProductFormValues> = async (data: ProductFormValues) => {
        // Filter empty strings from all array fields
        data.generalImages = (data.generalImages || []).filter(v => typeof v === "string" && v.trim() !== "");
        
        data.subProducts = (data.subProducts || []).map(s => ({
            ...s,
            images: (s.images || []).filter(v => typeof v === "string" && v.trim() !== ""),
            size: (s.size || []).filter(v => typeof v === "string" && v.trim() !== "")
        }));

        data.benefits = (data.benefits || []).filter(b => b.value.trim() !== "");
        data.ingredients = (data.ingredients || []).filter(i => i.value.trim() !== "");

        console.log("Form submission data (sanitized):", data);
        try {
            if (onSave) {
                await onSave(data);
            }
        } catch (err) {
            console.error("Submission failed:", err);
        }
    };

    const onError = (errors: any) => {
        console.error("Form validation failed for fields:", Object.keys(errors));
        console.error("Form validation error details:", errors);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Left Column - Essential Information */}
                <div className="lg:col-span-7 space-y-8">
                    <section className="space-y-4">
                        <div className="flex items-center gap-2 text-primary">
                            <Box className="h-5 w-5" />
                            <h3 className="font-bold uppercase tracking-wider">Basic Information</h3>
                        </div>
                        <div className="grid gap-4">
                            <div>
                                <Label htmlFor="title" className="text-xs font-semibold">PRODUCT TITLE *</Label>
                                <Input id="title" {...register("title")} placeholder="e.g. Wireless Noise Cancelling Headphones" className="mt-1" />
                                {errors.title && <p className="text-destructive text-[10px] uppercase font-bold mt-1">{errors.title.message}</p>}
                            </div>
                            <div>
                                <Label htmlFor="description" className="text-xs font-semibold">HOOK LINE / SHORT DESCRIPTION *</Label>
                                <Input id="description" {...register("description")} placeholder="A punchy 1-line summary (min 20 chars)" className="mt-1" />
                                {errors.description && <p className="text-destructive text-[10px] uppercase font-bold mt-1">{errors.description.message}</p>}
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="brand" className="text-xs font-semibold">MANUFACTURER / BRAND *</Label>
                                    <Input id="brand" {...register("brand")} placeholder="e.g. Sony, Bose" className="mt-1" />
                                    {errors.brand && <p className="text-destructive text-[10px] uppercase font-bold mt-1">{errors.brand.message as string}</p>}
                                </div>
                                <div>
                                    <Label className="text-xs font-semibold">VENDOR PARTNER *</Label>
                                    <Controller
                                        name="vendor"
                                        control={control}
                                        render={({ field }) => (
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <SelectTrigger className="mt-1">
                                                    <SelectValue placeholder="Select Vendor" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {vendors.map((v) => <SelectItem key={v.id} value={v.id}>{v.name}</SelectItem>)}
                                                </SelectContent>
                                            </Select>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <div className="flex items-center gap-2 text-primary">
                            <Filter className="h-5 w-5" />
                            <h3 className="font-bold uppercase tracking-wider">Categorization & Logic</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label className="text-xs font-semibold">PRIMARY CATEGORY *</Label>
                                <Controller
                                    name="category"
                                    control={control}
                                    render={({ field }) => (
                                        <Select onValueChange={(v) => {
                                            field.onChange(v);
                                            setValue("subcategory", ""); // Reset subcategory when primary changes
                                        }} defaultValue={field.value}>
                                            <SelectTrigger className="mt-1">
                                                <SelectValue placeholder="Select Category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {categoryTree.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                            </div>
                            <div>
                                <Label className="text-xs font-semibold">SUBCATEGORY *</Label>
                                <Controller
                                    name="subcategory"
                                    control={control}
                                    render={({ field }) => (
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="mt-1">
                                                <SelectValue placeholder="Select Subcategory" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {(() => {
                                                    const selectedCatId = watch("category");
                                                    const selectedCat = categoryTree.find(c => c.id === selectedCatId);
                                                    const subs = selectedCat?.subCategories || [];

                                                    if (subs.length === 0) return <SelectItem value="none" disabled>No Subcategories Found</SelectItem>;

                                                    return subs.map((s) => (
                                                        <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                                                    ));
                                                })()}
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                            </div>
                            <div>
                                <Label htmlFor="sku" className="text-xs font-semibold">UNIQUE SKU *</Label>
                                <Input id="sku" {...register("sku")} placeholder="e.g. AUD-001-WH" className="mt-1 font-mono" />
                                {errors.sku && <p className="text-destructive text-[10px] uppercase font-bold mt-1">{errors.sku.message as string}</p>}
                            </div>
                            <div>
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="slug" className="text-xs font-semibold">URL SLUG *</Label>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="h-4 p-0 text-[10px] text-primary hover:text-primary hover:bg-transparent uppercase font-bold"
                                        onClick={() => {
                                            const generatedSlug = watchTitle
                                                ?.toLowerCase()
                                                .trim()
                                                .replace(/[^a-z0-9\s-]/g, "")
                                                .replace(/\s+/g, "-")
                                                .replace(/-+/g, "-");
                                            setValue("slug", generatedSlug || "", { shouldValidate: true, shouldDirty: true });
                                        }}
                                    >
                                        Sync with Title
                                    </Button>
                                </div>
                                <Input id="slug" {...register("slug")} placeholder="e.g. wireless-headphones" className="mt-1 font-mono" />
                                {errors.slug && <p className="text-destructive text-[10px] uppercase font-bold mt-1">{errors.slug.message as string}</p>}
                            </div>
                            <div>
                                <Label htmlFor="discount" className="text-xs font-semibold">FLAT DISCOUNT (%)</Label>
                                <Input id="discount" type="number" {...register("discount", { valueAsNumber: true })} className="mt-1" />
                                {errors.discount && <p className="text-destructive text-[10px] uppercase font-bold mt-1">{errors.discount.message as string}</p>}
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-3 p-3 bg-muted/20 rounded-xl border border-dashed border-primary/20">
                                <Controller
                                    name="featured"
                                    control={control}
                                    render={({ field }) => (
                                        <Switch id="featured" checked={field.value} onCheckedChange={field.onChange} />
                                    )}
                                />
                                <Label htmlFor="featured" className="cursor-pointer font-bold text-xs uppercase text-primary">Mark as Featured</Label>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-muted/20 rounded-xl border border-dashed border-destructive/20">
                                <Controller
                                    name="disableProduct"
                                    control={control}
                                    render={({ field }) => (
                                        <Switch id="disableProduct" checked={field.value} onCheckedChange={field.onChange} className="data-[state=checked]:bg-destructive" />
                                    )}
                                />
                                <Label htmlFor="disableProduct" className="cursor-pointer font-bold text-xs uppercase text-destructive">Disable Product</Label>
                            </div>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <div className="flex items-center gap-2 text-primary">
                            <FileImage className="h-5 w-5" />
                            <h3 className="font-bold uppercase tracking-wider">Detailed Narrative</h3>
                        </div>
                        <div>
                            <Label htmlFor="longDescription" className="text-xs font-semibold">STORYTELLING / LONG DESCRIPTION *</Label>
                            <Textarea id="longDescription" rows={10} {...register("longDescription")} placeholder="Go deep into product features, history, and usage..." className="mt-1 leading-relaxed" />
                            {errors.longDescription && <p className="text-destructive text-[10px] uppercase font-bold mt-1">{errors.longDescription.message}</p>}
                        </div>
                    </section>
                </div>

                {/* Right Column - Media & Variants */}
                <div className="lg:col-span-5 space-y-8">
                    <section className="p-6 bg-muted/20 rounded-2xl border border-dashed border-primary/20 space-y-6">
                        <MultiUrlInput
                            label="Product Media Gallery"
                            values={watchGeneralImages}
                            onChange={(vals) => setValue("generalImages", vals, { shouldValidate: true })}
                            placeholder="https://images.unsplash.com/photo-..."
                        />
                        {errors.generalImages && <p className="text-destructive text-[10px] uppercase font-bold text-center">{errors.generalImages.message}</p>}
                    </section>

                    <section className="space-y-4">
                        <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-primary">
                                <List className="h-5 w-5" />
                                <h3 className="font-bold uppercase tracking-wider">Variants & Inventory</h3>
                            </div>
                            <Button type="button" variant="outline" size="sm" onClick={() => appendSubProduct({ sku: "", type: "", qty: 0, price: 0, images: [""], size: [""] })} className="h-7 text-xs gap-1 border-primary/30">
                                <Plus className="h-3 w-3" /> Add Variant
                            </Button>
                        </div>
                        <div className="space-y-3">
                            {subProductFields.map((field, index) => (
                                <Card key={field.id} className="p-4 bg-background border-primary/10 shadow-sm relative group overflow-hidden">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                                    <div className="grid gap-3">
                                        <div className="flex items-center gap-3">
                                            <div className="flex-1">
                                                <Label className="text-[10px] font-bold text-muted-foreground uppercase">Sub-SKU</Label>
                                                <Input placeholder="e.g. SKU-RED-L" {...register(`subProducts.${index}.sku`)} className="mt-0.5 h-8 text-xs font-mono" />
                                            </div>
                                            <div className="flex-1">
                                                <Label className="text-[10px] font-bold text-muted-foreground uppercase">Variant Type</Label>
                                                <Input placeholder="Small, Red, 1TB..." {...register(`subProducts.${index}.type`)} className="mt-0.5 h-8 text-xs" />
                                            </div>
                                            <div className="w-16">
                                                <Label className="text-[10px] font-bold text-muted-foreground uppercase">Qty</Label>
                                                <Input type="number" placeholder="0" {...register(`subProducts.${index}.qty`, { valueAsNumber: true })} className="mt-0.5 h-8 text-xs" />
                                            </div>
                                            <div className="w-20">
                                                <Label className="text-[10px] font-bold text-muted-foreground uppercase">Price ($)</Label>
                                                <Input type="number" step="0.01" placeholder="0.00" {...register(`subProducts.${index}.price`, { valueAsNumber: true })} className="mt-0.5 h-8 text-xs" />
                                            </div>
                                            {subProductFields.length > 1 && (
                                                <Button type="button" variant="ghost" size="icon" onClick={() => removeSubProduct(index)} className="mt-4 h-8 w-8 text-destructive hover:bg-destructive/5 shrink-0">
                                                    <Trash2 className="h-3.5 w-3.5" />
                                                </Button>
                                            )}
                                        </div>
                                        <div className="mt-2 pt-2 border-t border-dashed space-y-4">
                                            <Controller
                                                name={`subProducts.${index}.images`}
                                                control={control}
                                                render={({ field }) => (
                                                    <MultiUrlInput
                                                        label="Variant Images"
                                                        values={field.value || []}
                                                        onChange={(vals) => field.onChange(vals)}
                                                        placeholder="Variant image URL..."
                                                    />
                                                )}
                                            />
                                            <div>
                                                <Controller
                                                    name={`subProducts.${index}.size`}
                                                    control={control}
                                                    render={({ field }) => (
                                                        <TagInput 
                                                            label="Available sizes / options"
                                                            values={field.value || [""]}
                                                            onChange={(vals) => field.onChange(vals)}
                                                            placeholder="Size..."
                                                        />
                                                    )}
                                                />
                                                {errors.subProducts?.[index]?.size && <p className="text-destructive text-[10px] uppercase font-bold mt-1">{errors.subProducts[index].size.message}</p>}
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </section>

                    <section className="grid grid-cols-1 gap-6">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="font-bold uppercase tracking-wider text-xs text-primary">Core Benefits</h3>
                                <Button type="button" variant="ghost" size="sm" onClick={() => appendBenefit({ value: "" })} className="h-6 text-[10px] items-center gap-1">
                                    <Plus className="h-3 w-3" /> Add Benefit
                                </Button>
                            </div>
                            <div className="space-y-2">
                                {benefitFields.map((field, index) => (
                                    <div key={field.id} className="flex gap-2">
                                        <Input {...register(`benefits.${index}.value`)} placeholder="e.g. 24h Battery Life" className="h-8 text-xs" />
                                        <Button type="button" variant="ghost" size="icon" onClick={() => removeBenefit(index)} className="h-8 w-8 text-muted-foreground hover:text-destructive">
                                            <Trash2 className="h-3.5 w-3.5" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="font-bold uppercase tracking-wider text-xs text-primary">Ingredients / Materials</h3>
                                <Button type="button" variant="ghost" size="sm" onClick={() => appendIngredient({ value: "" })} className="h-6 text-[10px] items-center gap-1">
                                    <Plus className="h-3 w-3" /> Add Line
                                </Button>
                            </div>
                            <div className="space-y-2">
                                {ingredientFields.map((field, index) => (
                                    <div key={field.id} className="flex gap-2">
                                        <Input {...register(`ingredients.${index}.value`)} placeholder="e.g. Recycled Aluminum" className="h-8 text-xs" />
                                        <Button type="button" variant="ghost" size="icon" onClick={() => removeIngredient(index)} className="h-8 w-8 text-muted-foreground hover:text-destructive">
                                            <Trash2 className="h-3.5 w-3.5" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            <div className="flex justify-end gap-3 pt-10 border-t sticky bottom-0 bg-background/80 backdrop-blur-sm pb-4">
                <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting} className="min-w-[120px]">
                    Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting} className="min-w-[200px] shadow-lg shadow-primary/20">
                    {isSubmitting ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Processing...</> :
                        initialData?._id || initialData?.id ? "Apply Modifications" : "Register Product"}
                </Button>
            </div>
        </form>
    );
}