import prisma from "../utils/db";
import { verify } from 'argon2';

export function findUserByEmail(email: string) {
    return prisma.user.findUnique({
        where: { email }
    })
}

export function findUserById(id: number) {
    return prisma.user.findUnique({
        where: { id }
    })
}

export function validatePassword(hash: string, candidatePassword: string) {
    return verify(hash, candidatePassword);
}