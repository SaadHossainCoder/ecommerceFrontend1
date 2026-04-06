"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
    ImageIcon,
    Upload,
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

interface EditProductFormProps {
    onClose?: () => void;
    onSave?: (data: ProductFormValues) => void;
    initialData?: any;
}

const vendorOptions = [
    "AudioTech Distributors",
    "SoundWave Pvt Ltd",
    "Premium Audio Hub",
    "Global Electronics",
    "TechGear Imports",
    "Vista Audio Solutions",
];

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

export default function EditProductForm({
    onClose,
    onSave,
    initialData,
}: EditProductFormProps) {

    // Map initial images from objects to strings
    const initialImages = initialData?.images?.map((img: any) => typeof img === 'string' ? img : img.url) || [""];

    const {
        register,
        control,
        handleSubmit,
        setValue,
        watch,
        formState: { isSubmitting, errors },
    } = useForm<ProductFormValues>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            title: initialData?.title || "",
            shortDescription: initialData?.shortDescription || "",
            longDescription: initialData?.longDescription || "",
            brand: initialData?.brand || "",
            vendor: initialData?.vendor || "",
            sku: initialData?.sku || "",
            discount: initialData?.discount || 0,
            category: initialData?.category || "",
            subcategory: initialData?.subcategory || "",
            isFeatured: initialData?.isFeatured || false,
            sizes: initialData?.sizes?.map((s: any) => ({
                name: s.size || s.name || "",
                stock: Number(s.qty || s.stock || 0),
                price: Number(s.price || 0),
                image: s.image || ""
            })) || [{ name: "", stock: 0, price: 0, image: "" }],
            benefits: initialData?.benefits || [""],
            ingredients: initialData?.ingredients || [""],
            images: initialImages,
        },
    });

    const { fields: sizeFields, append: appendSize, remove: removeSize } = useFieldArray({ control, name: "sizes" });
    const { fields: benefitFields, append: appendBenefit, remove: removeBenefit } = useFieldArray({ control, name: "benefits" });
    const { fields: ingredientFields, append: appendIngredient, remove: removeIngredient } = useFieldArray({ control, name: "ingredients" });

    const watchImages = watch("images");

    const onSubmit = (data: ProductFormValues) => {
        onSave?.(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
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
                                <Label htmlFor="shortDescription" className="text-xs font-semibold">HOOK LINE / SHORT DESCRIPTION *</Label>
                                <Input id="shortDescription" {...register("shortDescription")} placeholder="A punchy 1-line summary (min 20 chars)" className="mt-1" />
                                {errors.shortDescription && <p className="text-destructive text-[10px] uppercase font-bold mt-1">{errors.shortDescription.message}</p>}
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="brand" className="text-xs font-semibold">MANUFACTURER / BRAND *</Label>
                                    <Input id="brand" {...register("brand")} placeholder="e.g. Sony, Bose" className="mt-1" />
                                </div>
                                <div>
                                    <Label className="text-xs font-semibold">VENDOR PARTNER *</Label>
                                    <Select onValueChange={(v) => setValue("vendor", v, { shouldValidate: true })} defaultValue={watch("vendor")}>
                                        <SelectTrigger className="mt-1">
                                            <SelectValue placeholder="Select Vendor" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {vendorOptions.map((v) => <SelectItem key={v} value={v}>{v}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
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
                                <Select onValueChange={(v) => setValue("category", v, { shouldValidate: true })} defaultValue={watch("category")}>
                                    <SelectTrigger className="mt-1">
                                        <SelectValue placeholder="Select Category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Electronics">Electronics</SelectItem>
                                        <SelectItem value="Audio">Audio</SelectItem>
                                        <SelectItem value="Fashion">Fashion</SelectItem>
                                        <SelectItem value="Home & Living">Home & Living</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label className="text-xs font-semibold">SUBCATEGORY *</Label>
                                <Select onValueChange={(v) => setValue("subcategory", v, { shouldValidate: true })} defaultValue={watch("subcategory")}>
                                    <SelectTrigger className="mt-1">
                                        <SelectValue placeholder="Select Subcategory" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Wireless">Wireless</SelectItem>
                                        <SelectItem value="Wired">Wired</SelectItem>
                                        <SelectItem value="Accessories">Accessories</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="sku" className="text-xs font-semibold">UNIQUE SKU *</Label>
                                <Input id="sku" {...register("sku")} placeholder="e.g. AUD-001-WH" className="mt-1 font-mono" />
                            </div>
                            <div>
                                <Label htmlFor="discount" className="text-xs font-semibold">FLAT DISCOUNT (%)</Label>
                                <Input id="discount" type="number" {...register("discount", { valueAsNumber: true })} className="mt-1" />
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-muted/20 rounded-xl border border-dashed border-primary/20">
                            <Switch id="featured" checked={watch("isFeatured")} onCheckedChange={(v) => setValue("isFeatured", v)} />
                            <Label htmlFor="featured" className="cursor-pointer font-bold text-xs uppercase">Mark as Featured Product</Label>
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
                            values={watchImages}
                            onChange={(vals) => setValue("images", vals, { shouldValidate: true })}
                            placeholder="https://images.unsplash.com/photo-..."
                        />
                        {errors.images && <p className="text-destructive text-[10px] uppercase font-bold text-center">{errors.images.message}</p>}
                    </section>

                    <section className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-primary">
                                <List className="h-5 w-5" />
                                <h3 className="font-bold uppercase tracking-wider">Variants & Inventory</h3>
                            </div>
                            <Button type="button" variant="outline" size="sm" onClick={() => appendSize({ name: "", stock: 0, price: 0, image: "" })} className="h-7 text-xs gap-1 border-primary/30">
                                <Plus className="h-3 w-3" /> Add Variant
                            </Button>
                        </div>
                        <div className="space-y-3">
                            {sizeFields.map((field, index) => (
                                <Card key={field.id} className="p-4 bg-background border-primary/10 shadow-sm relative group overflow-hidden">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                                    <div className="grid gap-3">
                                        <div className="flex items-center gap-3">
                                            <div className="flex-1">
                                                <Label className="text-[10px] font-bold text-muted-foreground uppercase">Variant Name</Label>
                                                <Input placeholder="Small, Red, 1TB..." {...register(`sizes.${index}.name`)} className="mt-0.5 h-8 text-xs" />
                                            </div>
                                            <div className="w-20">
                                                <Label className="text-[10px] font-bold text-muted-foreground uppercase">Qty</Label>
                                                <Input type="number" placeholder="0" {...register(`sizes.${index}.stock`, { valueAsNumber: true })} className="mt-0.5 h-8 text-xs" />
                                            </div>
                                            <div className="w-24">
                                                <Label className="text-[10px] font-bold text-muted-foreground uppercase">Price ($)</Label>
                                                <Input type="number" step="0.01" placeholder="0.00" {...register(`sizes.${index}.price`, { valueAsNumber: true })} className="mt-0.5 h-8 text-xs" />
                                            </div>
                                            {sizeFields.length > 1 && (
                                                <Button type="button" variant="ghost" size="icon" onClick={() => removeSize(index)} className="mt-4 h-8 w-8 text-destructive hover:bg-destructive/5 shrink-0">
                                                    <Trash2 className="h-3.5 w-3.5" />
                                                </Button>
                                            )}
                                        </div>
                                        <div>
                                            <Label className="text-[10px] font-bold text-muted-foreground uppercase">Variant URL (Optional)</Label>
                                            <div className="flex items-center gap-3 mt-0.5">
                                                <Input placeholder="URL link..." {...register(`sizes.${index}.image`)} className="h-8 text-xs flex-1 border-dashed" />
                                                {watch(`sizes.${index}.image`) && (
                                                    <div className="h-8 w-8 rounded border overflow-hidden shrink-0">
                                                        <img src={watch(`sizes.${index}.image`)} className="w-full h-full object-cover" />
                                                    </div>
                                                )}
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
                                <Button type="button" variant="ghost" size="sm" onClick={() => appendBenefit("")} className="h-6 text-[10px] items-center gap-1">
                                    <Plus className="h-3 w-3" /> Add Benefit
                                </Button>
                            </div>
                            <div className="space-y-2">
                                {benefitFields.map((field, index) => (
                                    <div key={field.id} className="flex gap-2">
                                        <Input {...register(`benefits.${index}`)} placeholder="e.g. 24h Battery Life" className="h-8 text-xs" />
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
                                <Button type="button" variant="ghost" size="sm" onClick={() => appendIngredient("")} className="h-6 text-[10px] items-center gap-1">
                                    <Plus className="h-3 w-3" /> Add Line
                                </Button>
                            </div>
                            <div className="space-y-2">
                                {ingredientFields.map((field, index) => (
                                    <div key={field.id} className="flex gap-2">
                                        <Input {...register(`ingredients.${index}`)} placeholder="e.g. Recycled Aluminum" className="h-8 text-xs" />
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