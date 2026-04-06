import z from "zod";

/* =========================
   ✅ SCHEMA (FIXED)
========================= */
export const productSchema = z.object({
    title: z.string().min(5),
    shortDescription: z.string().min(20),
    longDescription: z.string().min(50),
    brand: z.string().min(2),
    vendor: z.string().min(1),
    sku: z.string().min(3),

    discount: z.number().min(0).max(100),

    category: z.string().min(1),
    subcategory: z.string().min(1),
    isFeatured: z.boolean(),

    sizes: z.array(
        z.object({
            name: z.string().min(1),
            stock: z.number().min(0),
            price: z.number().min(1),
            image: z.string().optional(),
        })
    ),

    benefits: z.array(z.string()),
    ingredients: z.array(z.string()),
    images: z.array(z.string()).min(1),
});

export type ProductFormValues = z.infer<typeof productSchema>;

