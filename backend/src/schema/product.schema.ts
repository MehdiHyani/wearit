import { number, object, string, TypeOf } from 'zod';

export const createProductSchema = object({
    body: object({
        name: string({
            // eslint-disable-next-line camelcase
            required_error: 'Name is required',
        }),
        price: number({
            // eslint-disable-next-line camelcase
            required_error: 'Price is required'
        }),
        imageUrl: string({
            // eslint-disable-next-line camelcase
            required_error: 'Image Url is required'
        }).url('Image Url is invalid'),
    }),
});

export const getProductsSchema = object({
    body: object({
        page: number().optional()
    })
});

export const getProductsByQuerySchema = object({
    body: object({
        page: number({
            // eslint-disable-next-line camelcase
            required_error: 'Page number is required'
        }),
        query: string({
            // eslint-disable-next-line camelcase
            required_error: 'Query is required'
        })
    })
});

export type getProductsByQueryInput = TypeOf<typeof getProductsByQuerySchema>['body'];

export type getProductsInput = TypeOf<typeof getProductsSchema>['body'];

export type CreateProductInput = TypeOf<typeof createProductSchema>['body'];