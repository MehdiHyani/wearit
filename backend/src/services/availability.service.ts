import { createAvailabilityInput } from '../schema/availability.schema';
import { itemsPerPage } from '../utils/constants';
import prisma from "../utils/db";

export function getAvailabilities(page: number = 1) {
    return prisma.availability.findMany({
        skip: (page - 1) * itemsPerPage,
        take: itemsPerPage,
    })
}

export function getAvailabilityByProduct(productId: number) {
    return prisma.availability.findMany({
        where: { productId }
    })
}

export function createAvailability(availability:createAvailabilityInput) {
    return prisma.availability.create({ data: availability })
}

export function deleteAvailability(productId: number, storeId: number) {
    return prisma.availability.delete({
        where: {
            storeId_productId: {
                productId,
                storeId
            }
        }
    })
}

export function updateAvailability(productId: number, storeId: number, quantityOnHand: number) {
    return prisma.availability.update({
        where: {
            storeId_productId: {
                productId,
                storeId
            }
        },
        data: { quantityOnHand }
    })
}