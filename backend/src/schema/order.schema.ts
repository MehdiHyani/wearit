import { number, object, string, TypeOf } from 'zod';

export const createOrderSchema = object({
    body: object({
        storeId: number({
            required_error: 'Store Id is required'
        }),
        lines: object({
            productId: number({
                required_error: 'Product Id is required'
            }),
            quantity: number({
                required_error: 'Quantity is required'
            }),
            price: number({
                required_error: 'Price is required'
            }),
        }).array().nonempty('Order must not be empty')
    }),
});

export const getOrdersSchema = object({
    body: object({
        page: number({
            required_error: 'Page is required'
        }),
    }),
});

export type getOrdersInput = TypeOf<typeof getOrdersSchema>['body'];

export type createOrderInput = TypeOf<typeof createOrderSchema>['body'];