"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2, Upload, X, Image as ImageIcon } from "lucide-react";
import { useState, useEffect } from "react";

const productSchema = z.object({
    title: z.string().min(5, "Title must be at least 5 characters"),
    shortDescription: z.string().min(20, "Short description must be at least 20 characters"),
    longDescription: z.string().min(50, "Long description is required"),
    brand: z.string().min(2, "Brand is required"),
    vendor: z.string().min(1, "Vendor is required"),
    sku: z.string().min(3, "SKU is required"),
    discount: z.number().min(0).max(100).optional().default(0),
    category: z.string().min(1, "Category is required"),
    subcategory: z.string().min(1, "Subcategory is required"),
    isFeatured: z.boolean().default(false),

    sizes: z.array(
        z.object({
            name: z.string().min(1, "Size name is required"),
            stock: z.number().min(0, "Stock must be 0 or more"),
            price: z.number().min(1, "Price must be greater than 0"),
            image: z.string().optional(),           // ← New: Image per size
        })
    ).min(1, "At least one size/variant is required"),

    benefits: z.array(z.string()).default([]),
    ingredients: z.array(z.string()).default([]),
    images: z.array(z.string()).min(1, "At least one main product image is required"),
});

type ProductFormValues = z.infer<typeof productSchema>;

interface EditProductFormProps {
    onClose?: () => void;
    onSave?: (data: ProductFormValues) => void;
    initialData?: Partial<ProductFormValues>;
}

const vendorOptions = [
    "AudioTech Distributors",
    "SoundWave Pvt Ltd",
    "Premium Audio Hub",
    "Global Electronics",
    "TechGear Imports",
    "Vista Audio Solutions",
];

export default function EditProductForm({ onClose, onSave, initialData }: EditProductFormProps) {
    const [mainImagePreviews, setMainImagePreviews] = useState<string[]>(initialData?.images || []);

    const {
        register,
        control,
        handleSubmit,
        setValue,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<ProductFormValues>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            title: "",
            shortDescription: "",
            longDescription: "",
            brand: "",
            vendor: "",
            sku: "",
            discount: 0,
            category: "",
            subcategory: "",
            isFeatured: false,
            sizes: [{ name: "", stock: 0, price: 0, image: "" }],
            benefits: [],
            ingredients: [],
            images: [],
            ...initialData,
        },
    });

    const { fields: sizeFields, append: appendSize, remove: removeSize } = useFieldArray({
        control,
        name: "sizes",
    });

    const { fields: benefitFields, append: appendBenefit, remove: removeBenefit } = useFieldArray({
        control,
        name: "benefits",
    });

    const { fields: ingredientFields, append: appendIngredient, remove: removeIngredient } = useFieldArray({
        control,
        name: "ingredients",
    });

    // Handle size-specific image change
    const handleSizeImageChange = (index: number, fileOrUrl: string) => {
        setValue(`sizes.${index}.image`, fileOrUrl);
    };

    const onSubmit = async (data: ProductFormValues) => {
        console.log("Product Data Submitted:", data);
        onSave?.(data);
        onClose?.();
    };

    const handleMainImageRemove = (index: number) => {
        const newImages = mainImagePreviews.filter((_, i) => i !== index);
        setMainImagePreviews(newImages);
        setValue("images", newImages);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold tracking-tight">Edit Product</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - Basic Info */}
                <div className="space-y-6">
                    <div>
                        <Label htmlFor="title">Product Title *</Label>
                        <Input id="title" {...register("title")} className="mt-1" />
                        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                    </div>

                    <div>
                        <Label htmlFor="shortDescription">Short Description *</Label>
                        <Textarea id="shortDescription" rows={4} {...register("shortDescription")} className="mt-1" />
                        {errors.shortDescription && <p className="text-red-500 text-sm mt-1">{errors.shortDescription.message}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="brand">Brand *</Label>
                            <Input id="brand" {...register("brand")} className="mt-1" />
                            {errors.brand && <p className="text-red-500 text-sm mt-1">{errors.brand.message}</p>}
                        </div>
                        <div>
                            <Label htmlFor="vendor">Vendor *</Label>
                            <Select onValueChange={(value) => setValue("vendor", value)} value={watch("vendor")}>
                                <SelectTrigger className="mt-1">
                                    <SelectValue placeholder="Select Vendor" />
                                </SelectTrigger>
                                <SelectContent>
                                    {vendorOptions.map((vendor) => (
                                        <SelectItem key={vendor} value={vendor}>
                                            {vendor}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.vendor && <p className="text-red-500 text-sm mt-1">{errors.vendor.message}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="sku">SKU *</Label>
                            <Input id="sku" {...register("sku")} className="mt-1" />
                        </div>
                        <div>
                            <Label htmlFor="discount">Discount (%)</Label>
                            <Input
                                id="discount"
                                type="number"
                                {...register("discount", { valueAsNumber: true })}
                                className="mt-1"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label>Category *</Label>
                            <Select onValueChange={(value) => setValue("category", value)} value={watch("category")}>
                                <SelectTrigger className="mt-1">
                                    <SelectValue placeholder="Select Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Electronics">Electronics</SelectItem>
                                    <SelectItem value="Audio">Audio</SelectItem>
                                    <SelectItem value="Headphones">Headphones</SelectItem>
                                    <SelectItem value="Accessories">Accessories</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label>Subcategory *</Label>
                            <Select onValueChange={(value) => setValue("subcategory", value)} value={watch("subcategory")}>
                                <SelectTrigger className="mt-1">
                                    <SelectValue placeholder="Select Subcategory" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Wireless">Wireless</SelectItem>
                                    <SelectItem value="Wired">Wired</SelectItem>
                                    <SelectItem value="Gaming">Gaming</SelectItem>
                                    <SelectItem value="Studio">Studio</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Switch
                            id="featured"
                            checked={watch("isFeatured")}
                            onCheckedChange={(checked) => setValue("isFeatured", checked)}
                        />
                        <Label htmlFor="featured" className="cursor-pointer">Featured Product</Label>
                    </div>

                    <div>
                        <Label htmlFor="longDescription">Long Description *</Label>
                        <Textarea id="longDescription" rows={8} {...register("longDescription")} className="mt-1" />
                        {errors.longDescription && <p className="text-red-500 text-sm mt-1">{errors.longDescription.message}</p>}
                    </div>
                </div>

                {/* Right Column - Variants & Media */}
                <div className="space-y-6">
                    {/* Sizes / Variants with Image Support */}
                    <div>
                        <Label className="mb-3 block">Sizes / Variants *</Label>
                        <div className="space-y-4">
                            {sizeFields.map((field, index) => {
                                const sizeImage = watch(`sizes.${index}.image`);
                                return (
                                    <div key={field.id} className="border rounded-lg p-4 space-y-4 bg-card">
                                        <div className="flex gap-3 items-end">
                                            {/* Size Name */}
                                            <div className="flex-1">
                                                <Input
                                                    placeholder="Variant Name (e.g. Black, 100ML, Large)"
                                                    {...register(`sizes.${index}.name`)}
                                                />
                                            </div>

                                            {/* Stock */}
                                            <div className="w-24">
                                                <Input
                                                    type="number"
                                                    placeholder="Stock"
                                                    {...register(`sizes.${index}.stock`, { valueAsNumber: true })}
                                                />
                                            </div>

                                            {/* Price */}
                                            <div className="w-28">
                                                <Input
                                                    type="number"
                                                    placeholder="Price"
                                                    {...register(`sizes.${index}.price`, { valueAsNumber: true })}
                                                />
                                            </div>

                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => removeSize(index)}
                                                disabled={sizeFields.length === 1}
                                            >
                                                <Trash2 className="h-4 w-4 text-red-500" />
                                            </Button>
                                        </div>

                                        {/* Variant Image Upload */}
                                        <div>
                                            <Label className="text-sm text-muted-foreground mb-1 block">
                                                Variant Image (Optional)
                                            </Label>
                                            <div className="flex items-center gap-3">
                                                {sizeImage ? (
                                                    <div className="relative w-20 h-20 border rounded-md overflow-hidden">
                                                        <img
                                                            src={sizeImage}
                                                            alt="Variant"
                                                            className="w-full h-full object-cover"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => handleSizeImageChange(index, "")}
                                                            className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5"
                                                        >
                                                            <X className="h-3 w-3" />
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div className="w-20 h-20 border border-dashed rounded-md flex items-center justify-center bg-muted">
                                                        <ImageIcon className="h-8 w-8 text-muted-foreground" />
                                                    </div>
                                                )}

                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => {
                                                        // In real app: open file input and handle upload
                                                        const fakeUrl = `https://via.placeholder.com/300x300/0066cc/ffffff?text=Variant+${index + 1}`;
                                                        handleSizeImageChange(index, fakeUrl);
                                                    }}
                                                >
                                                    <Upload className="mr-2 h-4 w-4" />
                                                    Upload Image
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <Button
                            type="button"
                            variant="outline"
                            className="mt-4"
                            onClick={() => appendSize({ name: "", stock: 0, price: 0, image: "" })}
                        >
                            <Plus className="mr-2 h-4 w-4" /> Add New Variant
                        </Button>
                    </div>

                    {/* Benefits & Ingredients (kept as before) */}
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <Label>Benefits</Label>
                            <Button type="button" variant="outline" size="sm" onClick={() => appendBenefit("")}>
                                <Plus className="mr-2 h-4 w-4" /> Add
                            </Button>
                        </div>
                        <div className="space-y-2">
                            {benefitFields.map((field, index) => (
                                <div key={field.id} className="flex gap-2">
                                    <Input {...register(`benefits.${index}`)} placeholder="Enter benefit..." />
                                    <Button type="button" variant="ghost" size="icon" onClick={() => removeBenefit(index)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <Label>Ingredients</Label>
                            <Button type="button" variant="outline" size="sm" onClick={() => appendIngredient("")}>
                                <Plus className="mr-2 h-4 w-4" /> Add
                            </Button>
                        </div>
                        <div className="space-y-2">
                            {ingredientFields.map((field, index) => (
                                <div key={field.id} className="flex gap-2">
                                    <Input {...register(`ingredients.${index}`)} placeholder="Enter ingredient..." />
                                    <Button type="button" variant="ghost" size="icon" onClick={() => removeIngredient(index)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Main Product Images */}
                    <div>
                        <Label className="mb-3 block">Main Product Images *</Label>
                        <div className="grid grid-cols-3 gap-4">
                            {mainImagePreviews.map((img, index) => (
                                <div key={index} className="relative group">
                                    <img
                                        src={img}
                                        alt={`Preview ${index + 1}`}
                                        className="w-full aspect-square object-cover rounded-lg border"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleMainImageRemove(index)}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <Button type="button" variant="outline" className="mt-4 w-full">
                            <Upload className="mr-2 h-4 w-4" /> Upload Main Images
                        </Button>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 pt-6 border-t">
                <Button type="button" variant="outline" onClick={onClose}>
                    Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Saving Changes..." : "Save Changes"}
                </Button>
            </div>
        </form>
    );
}