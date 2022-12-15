import { createAvailabilityInput } from '../schema/availability.schema';
import { itemsPerPage } from '../utils/constants';
import prisma from "../utils/db";

export function getAvailabilities(page = 1) {
    return prisma.availability.findMany({
        skip: (page - 1) * itemsPerPage,
        take: itemsPerPage,
    });
}

export function getAvailabilityByProduct(productId: number) {
    return prisma.availability.findMany({
        where: { PRO_ID: productId }
    });
}

export function createAvailability(availability:createAvailabilityInput) {
    return prisma.availability.create({ data: {
        AV_QUANTITY: availability.quantityOnHand,
        PRO_ID: availability.productId,
        STR_ID: availability.storeId,
    } });
}

export function deleteAvailability(productId: number, storeId: number) {
    return prisma.availability.delete({
        where: {
            STR_ID_PRO_ID: {
                PRO_ID: productId,
                STR_ID: storeId
            }
        }
    });
}

export function updateAvailability(productId: number, storeId: number, quantityOnHand: number) {
    return prisma.availability.update({
        where: {
            STR_ID_PRO_ID: {
                PRO_ID: productId,
                STR_ID: storeId
            }
        },
        data: { AV_QUANTITY :quantityOnHand }
    });
}