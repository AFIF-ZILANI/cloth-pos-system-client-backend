import { generateEAN13 } from "@/lib/barcode";
import prisma from "@/lib/prisma";
import { normalizeProductName } from "@/lib/product-name-normalizer";
import { generateSKU } from "@/lib/sku";
import type { CreateProduct } from "@/schemas/product.schema";
import type { PrismaTx } from "@/types";

export const ProductService = {
    async getAll(tx: PrismaTx) {
        return tx.product.findMany({
            select: {
                id: true,
                name: true,
                description: true,
                category: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                variants: {
                    select: {
                        id: true,
                        color: true,
                        size: true,
                    }
                }
            },

        });
    },
    async getById(tx: PrismaTx, id: string) {
        return tx.product.findUnique({
            where: { id },
            include: {
                variants: true,
            },
        });
    },
    async create(data: CreateProduct) {
        const normalized = normalizeProductName(data.name);

        const result = await prisma.$transaction(async (tx) => {
            const product = await tx.product.create({
                data: {
                    name: data.name,
                    description: data.description,
                    normalized_key: normalized,
                    category: {
                        connect: {
                            id: data.category_id,
                        },
                    }
                },
                include: {
                    category: {
                        select: {
                            name: true
                        }
                    }
                }
            })

            const productRef = await tx.productVariant.count();
            const variants = await Promise.all(
                data.variants.map((variant, i) => {
                    const sku = generateSKU({
                        category: product.category.name,
                        brand: data.brand,
                        color: variant.color || "",
                        size: variant.size || "",
                        sequence: productRef + i,
                    });
                    const barcode = generateEAN13("2000001", productRef + i);
                    console.log("productRef", productRef + i);
                    console.log("Barcode", barcode)
                    return tx.productVariant.create({
                        data: {
                            product: {
                                connect: {
                                    id: product.id,
                                },
                            },
                            sku,
                            barcode,
                            color: variant.color,
                            size: variant.size,
                        },
                    });
                })
            )
            return { product, variants };
        });
        return result;
    },
    async update(tx: PrismaTx, id: string, data: any) {
        return tx.product.update({
            where: { id },
            data,
        });
    },
    async deleteById(tx: PrismaTx, id: string) {
        return tx.product.delete({
            where: { id },
        });
    },
}