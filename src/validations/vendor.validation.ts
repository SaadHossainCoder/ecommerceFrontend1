import { z } from "zod";

export const vendorSchema = z.object({
  name: z.string().min(2, "Vendor name must be at least 2 characters"),
  slug: z.string().min(2, "Slug must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  longDescription: z.string().min(20, "Long description must be at least 20 characters"),
  vendorProductType: z.string().min(2, "Product type is required"),
  // Using objects for useFieldArray stability
  imageUrls: z.array(z.object({
    url: z.string().url("Invalid image URL").or(z.literal(""))
  })).min(1, "At least one image is required"),
  descImageUrls: z.array(z.object({
    url: z.string().url("Invalid image URL").or(z.literal(""))
  })).optional(),
});

export type VendorFormData = z.infer<typeof vendorSchema>;
