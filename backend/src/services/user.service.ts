import { verify } from 'argon2';
import prisma from "../utils/db";
import { CreateUserInput } from "../schema/user.schema";
import { User } from '@prisma/client';
import { itemsPerPage } from '../utils/constants';

export function getUserByEmail(email: string) {
    return prisma.user.findUniqueOrThrow({
        where: { USR_EMAIL :email }
    });
}

export function getUserById(id: number) {
    return prisma.user.findUniqueOrThrow({
        where: { USR_ID: id }
    });
}

export function validatePassword(hash: string, candidatePassword: string) {
    return verify(hash, candidatePassword);
}

export async function createUser(user: Omit<CreateUserInput, 'passwordConfirmation'>, role: 'customer'|'manager' = 'customer') {
    return await prisma.user.create({
        data: {
            USR_EMAIL: user.email,
            USR_FIRST_NAME: user.firstName,
            USR_LAST_NAME: user.lastName,
            USR_PASSWORD: user.password,
            USR_ROLE: role,
        }
    });
}

export async function editUser(userId: number, data: Partial<User>) {
    return await prisma.user.update({
        where: {
            USR_ID: userId
        },
        data
    });
}

export async function getUsers(page = 1) {
    return prisma.user.findMany({
        orderBy: {
            USR_CREATED: 'desc'
        },
        skip: (page-1)*itemsPerPage,
        take: itemsPerPage
    });
}