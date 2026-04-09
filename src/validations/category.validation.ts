import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50),
  slug: z.string().min(2, "Slug must be at least 2 characters").toLowerCase().regex(/^[a-z0-9-]+$/, "Invalid slug format (a-z, 0-9, - only)"),
  icon: z.string().optional(),
  featured: z.boolean(),
  parentCategoryId: z.string().optional().nullable(),
});

export type CategoryFormData = z.infer<typeof categorySchema>;
