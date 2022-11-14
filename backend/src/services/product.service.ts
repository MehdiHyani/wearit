import { CreateProductInput } from "../schema/product.schema";
import prisma from "../utils/db";

export function getProducts(page: number) {
    return prisma.product.findMany({
        orderBy: {
            lines: {
                _count: 'desc'
            }
        },
        skip: (page-1)*10,
        take: 10
    });
}

export function getFeaturedProducts() {
    return prisma.product.findMany({
        orderBy: {
            lines: {
                _count: 'desc'
            }
        },
        take: 10
    });
}

export function getProductsByQuery(query: string, page: number) {
    return prisma.product.findMany({
        where: {
            name: {
                contains: query,
                mode: 'insensitive',
            }
        },
        orderBy: {
            lines: {
                _count: 'desc'
            }
        },
        skip: (page-1)*10,
        take: 10
    })

}

export function deleteProductById(productId: number) {
    return prisma.product.delete({
        where: {
            id: productId
        }
    });
}

export function getProductById(productId: number) {
    return prisma.product.findUniqueOrThrow({
        where: {
            id: productId
        },
        include: {
            feedbacks: true,
            availabilities: true,
        }
    })
}

export function createProduct(product: CreateProductInput) {
    return prisma.product.create({ data: product })
}