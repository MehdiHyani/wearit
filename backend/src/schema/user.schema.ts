import { Role } from '@prisma/client';
import { number, object, string, TypeOf } from 'zod';

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

export const editCurrentUserSchema = object({
    body: object({
        firstName: string().optional(),
        lastName: string().optional(),
        password: string().min(8, 'Password should be at least 8 characters').optional(),
        passwordConfirmation: string().optional(),
    }).refine(data => data.password === data.passwordConfirmation, {
        message: 'Passwords do not match',
        path: ['passwordConfirmation'],
    }),
});

export const editUserSchema = object({
    body: object({
        firstName: string().optional(),
        lastName: string().optional(),
        // TODO: Maybe find a better way to handle password change from manager
        password: string().min(8, 'Password should be at least 8 characters').optional(),
        role: string().optional()
    }).refine(data => {
        if (data.role)
            return Object.keys(Role).includes(data.role);
        return true;
    }),
});

export const getUsersSchema = object({
    body: object({
        page: number().optional(),
    }),
});

export type getUsersInput = TypeOf<typeof getUsersSchema>['body']

export type editUserInput = TypeOf<typeof editUserSchema>['body']

export type editCurrentUserInput = TypeOf<typeof editCurrentUserSchema>['body']

export type CreateUserInput = TypeOf<typeof createUserSchema>['body'];