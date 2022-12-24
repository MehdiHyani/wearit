import { array, number, object, string, TypeOf } from 'zod';

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
        imageUrls: array(string().url('Image Url is invalid'))
            .min(0, 'At least one image Url is required')
            .max(5, 'You can\'t add more than 5 product images'),
        availableQuantity: number({
            // eslint-disable-next-line camelcase
            required_error: 'Available quantity is required'
        }).min(0, 'Available quantity is required'),
    }),
});

export const editProductSchema = object({
    body: object({
        name: string().optional(),
        price: number().min(0).optional(),
        imageUrls: array(string().url('Image Url is invalid'))
            .min(0, 'At least one image Url is required')
            .max(5, 'You can\'t add more than 5 product images')
            .optional(),
        availableQuantity: number()
            .min(0, 'Available quantity is required').optional(),
    }),
});

export const getProductsSchema = object({
    body: object({
        page: number().optional()
    })
});

export const getProductsByQuerySchema = object({
    body: object({
        page: number().optional(),
        query: string({
            // eslint-disable-next-line camelcase
            required_error: 'Query is required'
        })
    })
});

export type getProductsByQueryInput = TypeOf<typeof getProductsByQuerySchema>['body'];

export type getProductsInput = TypeOf<typeof getProductsSchema>['body'];

export type CreateProductInput = TypeOf<typeof createProductSchema>['body'];

export type EditProductInput = TypeOf<typeof editProductSchema>['body'];