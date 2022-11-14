import { number, object, string, TypeOf } from 'zod';

export const createFeedbackSchema = object({
    body: object({
        feedback: string({
            required_error: 'Feedback is required',
        }),
        productId: number({
            required_error: 'productId is required'
        }),
    }),
});

export const getFeedbacksByProductSchema = object({
    body: object({
        productId: number({
            required_error: 'productId is required'
        }),
    }),
});

export type getFeedbacksByProductInput = TypeOf<typeof getFeedbacksByProductSchema>['body'];

export type CreateFeedbackInput = TypeOf<typeof createFeedbackSchema>['body'];