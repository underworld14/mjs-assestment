import { z } from "zod";

export const addressSchema = z.object({
  street: z
    .string()
    .min(1, "Street is required")
    .max(255, "Street is too long"),
  city: z.string().min(1, "City is required").max(100, "City is too long"),
  province: z
    .string()
    .min(1, "Province is required")
    .max(100, "Province is too long"),
  postalCode: z
    .string()
    .min(1, "Postal code is required")
    .max(20, "Postal code is too long"),
});

export const userSchema = z.object({
  firstname: z
    .string()
    .min(1, "First name is required")
    .max(255, "First name is too long"),
  lastname: z
    .string()
    .min(1, "Last name is required")
    .max(255, "Last name is too long"),
  birthdate: z.string().min(1, "Birth date is required"),
  address: addressSchema,
});

export const updateUserSchema = userSchema.extend({
  id: z.number(),
});

export type UserFormData = z.infer<typeof userSchema>;
export type UpdateUserFormData = z.infer<typeof updateUserSchema>;
