import { number, object, string, TypeOf } from 'zod';

export const getAvailabilitiesSchema = object({
    body: object({
        page: number().optional(),
    }),
});

export const createAvailabilitySchema = object({
    body: object({
        productId: number({
            required_error: 'Product id is required'
        }),
        storeId: number({
            required_error: 'Store id is required'
        }),
        quantityOnHand: number({
            required_error: 'Quantity on Hand is required'
        }),
    }),
});

export const updateAvailabilitySchema = object({
    body: object({
        productId: number({
            required_error: 'Product id is required'
        }),
        storeId: number({
            required_error: 'Store id is required'
        }),
        quantityOnHand: number({
            required_error: 'Quantity on Hand is required'
        }),
    }),
});

export const deleteAvailabilitySchema = object({
    body: object({
        productId: number({
            required_error: 'Product id is required'
        }),
        storeId: number({
            required_error: 'Store id is required'
        }),
    }),
});

export type deleteAvailabilityInput = TypeOf<typeof deleteAvailabilitySchema>['body'];

export type updateAvailabilityInput = TypeOf<typeof updateAvailabilitySchema>['body'];

export type createAvailabilityInput = TypeOf<typeof createAvailabilitySchema>['body'];

export type getAvailabilitiesInput = TypeOf<typeof getAvailabilitiesSchema>['body'];