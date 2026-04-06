import { z } from "zod";

export const bannerSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  image: z.string().url("Invalid image URL"),
  link: z.string().url("Invalid link URL"),
  type: z.enum(["HOME", "CATEGORY", "PRODUCT"]),
});

export type BannerFormData = z.infer<typeof bannerSchema>;
