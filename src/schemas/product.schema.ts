import { Size } from "generated/prisma";
import { z } from "zod";


const productVariant = z.object({
    color: z.string().optional(),
    size: z.nativeEnum(Size).optional(),
}).superRefine((data, ctx) => {
    if (!data.color && !data.size) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Color or size is required",
            path: ["color", "size"],
        });
    }
});

export const createProductSchema = z.object({
    name: z.string().min(1, "Product name is required"),
    description: z.string().optional(),
    brand: z.string().min(1, "Brand is required"),
    category_id: z.string().uuid(),
    variants: z.array(productVariant),
});


export const updateProductSchema = z.object({
    id: z.string().uuid(),
    name: z.string().optional(),
    description: z.string().optional(),
    category: z.string().uuid().optional(),
    variants: z.object({
        id: z.string().uuid(),
        color: z.string().optional(),
        size: z.nativeEnum(Size).optional(),
    }).optional()
})


export type CreateProduct = z.infer<typeof createProductSchema>
export type UpdateProduct = z.infer<typeof updateProductSchema>