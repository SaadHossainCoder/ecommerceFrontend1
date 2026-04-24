import z from "zod";

/* =========================
   ✅ SCHEMA (FIXED)
========================= */
export const productSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 chars").max(100),
    description: z.string().min(10, "Description must be at least 10 chars"),
    longDescription: z.string().min(20, "Long description must be at least 20 chars"),
    brand: z.string().min(1, "Brand must be at least 1 char").optional().or(z.literal("")),
    vendor: z.string().min(1, "Vendor is required"),
    sku: z.string().min(3, "SKU must be at least 3 chars"),
    slug: z.string().min(3, "Slug must be at least 3 chars"),

    discount: z.number().min(0).max(100),

    category: z.string().min(1, "Category is required"),
    subcategory: z.string().min(1, "Subcategory is required"),
    featured: z.boolean(),
    disableProduct: z.boolean().optional(),
    disableProductDate: z.string().optional().nullable(),

    subProducts: z.array(
        z.object({
            sku: z.string().min(3, "Sub-SKU must be at least 3 chars"),
            type: z.string().min(1, "Variant type required"), // size, color, etc.
            qty: z.number().min(0, "Qty must be >= 0"),
            price: z.number().min(1, "Price required"),
            images: z.array(z.string()).min(1, "At least one image per variant"),
            size: z.array(z.string()).min(1, "At least one size per variant"),
        })
    ),

    benefits: z.array(z.object({ value: z.string() })),
    ingredients: z.array(z.object({ value: z.string() })),
    generalImages: z.array(z.string()).min(1, "At least one general image required"),
});

export type ProductFormValues = z.infer<typeof productSchema>;

