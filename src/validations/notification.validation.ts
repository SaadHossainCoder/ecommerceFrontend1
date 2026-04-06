import { z } from "zod";

export const notificationSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  message: z.string().min(5, "Message must be at least 5 characters"),
  link: z.string().url("Invalid link URL").optional().or(z.literal("")),
  isActive: z.boolean(),
});

export type NotificationFormData = z.infer<typeof notificationSchema>;
