import { Role } from '@prisma/client';
import { object, string, TypeOf } from 'zod';

export const createUserSchema = object({
    body: object({
        firstName: string({
            required_error: 'First Name is required',
        }),
        lastName: string({
            required_error: 'Last Name is required',
        }),
        password: string({
            required_error: 'Password is required',
        }).min(8, 'Password should be at least 8 characters'),
        passwordConfirmation: string({
            required_error: 'Password Confirmation is required',
        }),
        email: string({
            required_error: 'Email is required',
        }).email('Please provide a valid email'),

    }).refine((data) => data.password === data.passwordConfirmation, {
        message: 'Passwords do not match',
        path: ['passwordConfirmation'],
    }),
});

export const editCurrentUserSchema = object({
    body: object({
        firstName: string().nullable(),
        lastName: string().nullable(),
        password: string().min(8, 'Password should be at least 8 characters').nullable(),
        passwordConfirmation: string().nullable(),
    }).refine((data) => data.password === data.passwordConfirmation, {
        message: 'Passwords do not match',
        path: ['passwordConfirmation'],
    }),
});

export const editUserSchema = object({
    body: object({
        firstName: string().nullable(),
        lastName: string().nullable(),
        password: string().min(8, 'Password should be at least 8 characters').nullable(),
        role: string().nullable()
    }).refine((data) => {
        if (data.role)
            return Object.keys(Role).includes(data.role)
        return true;
    }),
});

export type editUserInput = TypeOf<typeof editUserSchema>['body']

export type editCurrentUserInput = TypeOf<typeof editCurrentUserSchema>['body']

export type CreateUserInput = TypeOf<typeof createUserSchema>['body'];