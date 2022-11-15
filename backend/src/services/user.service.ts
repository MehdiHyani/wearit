import { hash } from 'argon2'
import { verify } from 'argon2';
import prisma from "../utils/db";
import { CreateUserInput } from "../schema/user.schema";
import { User } from '@prisma/client';

export function findUserByEmail(email: string) {
    return prisma.user.findUniqueOrThrow({
        where: { email }
    })
}

export function findUserById(id: number) {
    return prisma.user.findUniqueOrThrow({
        where: { id }
    })
}

export function validatePassword(hash: string, candidatePassword: string) {
    return verify(hash, candidatePassword);
}

export async function createUser(user: Omit<CreateUserInput, 'passwordConfirmation'>, role: 'customer'|'manager' = 'customer') {
    return await prisma.user.create({
        data: {
            ...user,
            role,
        }
    });
}

export async function editUser(userId: number, data: Partial<User>) {
    return await prisma.user.update({
        where: {
            id: userId
        },
        data
    });
}