import prisma from "@/lib/prisma";
import { ProductService } from "@/services/product.service";
import { sendError, sendSuccess } from "@/utils/response";
import type { Context } from "hono";

export const ProductController = {
    async getAll(c: Context) {

        const products = await prisma.product.findMany({
            include: {
                variants: true,
            },
        });

        return sendSuccess(c, products, "Products fetched successfully", 200);
    },
    async getById(c: Context) {
        const id = c.req.param("id");

        const product = await prisma.product.findUnique({
            where: { id },
            include: {
                variants: true,
            },
        });

        if (!product) {
            return sendError(c, "Product not found", "NOT_FOUND", 404);
        }

        return sendSuccess(c, product, "Product fetched successfully", 200);
    },
    async create(c: Context) {
        const body = await c.req.json();
        const product = await ProductService.create(body)

        return sendSuccess(c, product, "Product created successfully", 201);
    },
    async update(c: Context) {
        const id = c.req.param("id");
        const body = await c.req.json();

        const product = await prisma.product.update({
            where: { id },
            data: body,
        });

        return sendSuccess(c, product, "Product updated successfully", 200);
    },
    async deleteById(c: Context) {
        const id = c.req.param("id");
        if (!id) {
            return sendError(c, "No ID provided", "BAD_REQUEST", 400);
        }
        const product = await prisma.product.delete({
            where: { id },
        });

        return sendSuccess(c, product, "Product deleted successfully", 200);
    },
}