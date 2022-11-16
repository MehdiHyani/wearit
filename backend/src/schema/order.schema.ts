import { number, object, TypeOf } from 'zod';

export const createOrderSchema = object({
    body: object({
        storeId: number({
            // eslint-disable-next-line camelcase
            required_error: 'Store Id is required'
        }),
        lines: object({
            productId: number({
                // eslint-disable-next-line camelcase
                required_error: 'Product Id is required'
            }),
            quantity: number({
                // eslint-disable-next-line camelcase
                required_error: 'Quantity is required'
            }),
            price: number({
                // eslint-disable-next-line camelcase
                required_error: 'Price is required'
            }),
        }).array().nonempty('Order must not be empty')
    }),
});

export const getOrdersSchema = object({
    body: object({
        page: number().optional(),
    }),
});

export type getOrdersInput = TypeOf<typeof getOrdersSchema>['body'];

export type createOrderInput = TypeOf<typeof createOrderSchema>['body'];