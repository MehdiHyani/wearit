import { object, string, TypeOf } from 'zod';

export const createUserSchema = object({
    body: object({
        firstName: string({
            // eslint-disable-next-line camelcase
            required_error: 'First Name is required',
        }),
        lastName: string({
            // eslint-disable-next-line camelcase
            required_error: 'Last Name is required',
        }),
        password: string({
            // eslint-disable-next-line camelcase
            required_error: 'Password is required',
        }).min(8, 'Password should be at least 8 characters'),
        passwordConfirmation: string({
            // eslint-disable-next-line camelcase
            required_error: 'Password Confirmation is required',
        }),
        email: string({
            // eslint-disable-next-line camelcase
            required_error: 'Email is required',
        }).email('Please provide a valid email'),

    }).refine(data => data.password === data.passwordConfirmation, {
        message: 'Passwords do not match',
        path: ['passwordConfirmation'],
    }),
});

export type CreateUserInput = TypeOf<typeof createUserSchema>['body'];