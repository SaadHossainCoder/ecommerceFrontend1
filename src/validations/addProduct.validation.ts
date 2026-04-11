import z from "zod";

/* =========================
   ✅ SCHEMA (FIXED)
========================= */
export const productSchema = z.object({
    title: z.string().min(5, "Title must be at least 5 chars"),
    description: z.string().min(20, "Description must be at least 20 chars"),
    longDescription: z.string().min(50, "Long description must be at least 50 chars"),
    brand: z.string().min(2, "Brand must be at least 2 chars"),
    vendor: z.string().min(1, "Vendor is required"),
    sku: z.string().min(3, "SKU must be at least 3 chars"),

    discount: z.number().min(0).max(100),

    category: z.string().min(1, "Category is required"),
    subcategory: z.string().optional(),
    featured: z.boolean(),

    sizes: z.array(
        z.object({
            size: z.string().min(1, "Variant name required"),
            qty: z.number().min(0, "Qty must be >= 0"),
            price: z.number().min(1, "Price required"),
            image: z.string().optional(),
            images: z.array(z.string()).optional(),
        })
    ),

    benefits: z.array(z.object({ value: z.string() })),
    ingredients: z.array(z.object({ value: z.string() })),
    images: z.array(z.string()).min(1),
});

export type ProductFormValues = z.infer<typeof productSchema>;

