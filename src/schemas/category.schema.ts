import { z } from "zod";

export const updateCategorySchema = z.object({
    id: z.string().min(1, "Category ID is required"),
    name: z.string().min(1, "Category name is required").optional(),
    description: z.string().optional(),
});

export type UpdateCategory = z.infer<typeof updateCategorySchema>;