import { Product } from "@prisma/client";
import { CreateProductInput } from "../schema/product.schema";
import { itemsPerPage } from "../utils/constants";
import prisma from "../utils/db";

export function getProducts(page = 1) {
    return prisma.product.findMany({
        orderBy: {
            PRO_LINES: {
                _count: 'desc'
            }
        },
        skip: (page-1)*itemsPerPage,
        take: itemsPerPage
    });
}

export function getFeaturedProducts() {
    return prisma.product.findMany({
        include: {
            PRO_IMAGES: true,
            PRO_FEEDBACKS: true,
        },
        orderBy: {
            PRO_LINES: {
                _count: 'desc'
            }
        },
        take: 10
    });
}

export function getProductsByQuery(query: string, page = 1) {
    return prisma.product.findMany({
        where: {
            PRO_NAME: {
                contains: query,
                mode: 'insensitive',
            }
        },
        orderBy: {
            PRO_LINES: {
                _count: 'desc'
            }
        },
        skip: (page-1)*10,
        take: 10
    });

}

export function deleteProductById(productId: number) {
    return prisma.product.delete({
        where: {
            PRO_ID: productId
        }
    });
}

export function getProductById(productId: number) {
    return prisma.product.findUniqueOrThrow({
        where: {
            PRO_ID: productId
        },
        include: {
            PRO_FEEDBACKS: true,
            PRO_IMAGES: true,
        }
    });
}

export function createProduct(product: CreateProductInput) {
    return prisma.product.create({ data: {
        PRO_NAME: product.name,
        PRO_PRICE: product.price,
        PRO_AVAILABLE_QUANTITY: product.availableQuantity,
        PRO_IMAGES: {
            createMany: {
                data: product.imageUrls.map(url => ({IMG_URL: url}))
            }
        }
    }});
}

export function editProduct(productId:number, data: Partial<Product>) {
    return prisma.product.update({
        where: {
            PRO_ID: productId
        },
        data
    });
}