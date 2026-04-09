import { z } from "zod";

export const couponSchema = z.object({
  code: z.string()
    .min(3, "Coupon code must be at least 3 characters")
    .max(20, "Code must be at most 20 characters")
    .toUpperCase(),
  description: z.string().max(255).optional(),
  discountType: z.enum(["PERCENTAGE", "FIXED"]),
  discountValue: z.number().min(0, "Value cannot be negative"),
  maxDiscountAmount: z.number().optional().nullable(),
  minPurchaseAmount: z.number().optional().nullable(),
  validFrom: z.string().min(1, "Valid from date is required"),
  validUntil: z.string().min(1, "Valid until date is required"),
  usageLimit: z.number().optional().nullable(),
  perUserLimit: z.number().optional().nullable(),
  isActive: z.boolean(),
}).refine((data) => {
  if (data.validFrom && data.validUntil) {
    return new Date(data.validFrom) < new Date(data.validUntil);
  }
  return true;
}, {
  message: "Valid from date must be before valid until date",
  path: ["validFrom"]
});

export type CouponFormData = z.infer<typeof couponSchema>;
