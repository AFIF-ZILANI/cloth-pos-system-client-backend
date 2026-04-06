import type { Context } from "hono";
import { sendError, sendSuccess } from "@/utils/response";
import prisma from "@/lib/prisma";

export const categoryController = {
    async createCategory(c: Context) {
        const body = await c.req.json();
        const { name, description, parent_id } = body;

        if (!name || typeof name !== "string" || name.trim().length === 0) {
            return sendError(c, "Category name is required", "INVALID_INPUT", 400);
        }

        if (parent_id && typeof parent_id !== "string" && parent_id.trim().length === 0) {
            return sendError(c, "Parent ID must be a string", "INVALID_INPUT", 400);
        }

        if (description && typeof description !== "string" && description.trim().length === 0) {
            return sendError(c, "Description must be a string", "INVALID_INPUT", 400);
        }

        const existingCategory = await prisma.category.findFirst({
            where: {
                name: {
                    equals: name,
                    mode: "insensitive",
                },
            },
        });

        if (existingCategory) {
            return sendError(c, "Category already exists", "INVALID_INPUT", 400);
        }

        if (parent_id) {
            const parentCategory = await prisma.category.findUnique({
                where: {
                    id: parent_id,
                },
            });

            if (!parentCategory) {
                return sendError(c, "Parent category not found", "INVALID_INPUT", 400);
            }
        }



        await prisma.category.create({
            data: {
                name,
                description,
                parent_id: parent_id || null,
            }
        });
        return sendSuccess(c, {}, "Category created successfully", 201);
    },

    async getCategories(c: Context) {
        const categories = await prisma.category.findMany({
            where: {
                parent_id: null
            },
            select: {
                id: true,
                name: true,
                description: true,
                children: {
                    select: {
                        id: true,
                        name: true,
                        description: true,
                    }
                }
            }
        });
        return sendSuccess(c, categories, "Categories fetched successfully", 200);
    },

    async updateCategory(c: Context) {
        return sendSuccess(c, {}, "Category updated successfully", 200);
    },

    async deleteCategory(c: Context) {
        return sendSuccess(c, {}, "Category deleted successfully", 200);
    },
};