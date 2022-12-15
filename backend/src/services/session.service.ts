import prisma from "../utils/db";

export function createSession(userId: number) {
    return prisma.session.create({
        data: { USR_ID: userId }
    });
}