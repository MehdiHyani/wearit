import prisma from "../utils/db";

export function createSession(userId: number) {
    return prisma.session.create({
        data: { USR_ID: userId }
    });
}

export function findSessionById(sessionId: number) {
    return prisma.session.findUniqueOrThrow({
        where: {
            SES_ID: sessionId
        }
    });
}

export function updateSessionValidity(sessionId: number, valid: boolean) {
    return prisma.session.update({
        where: {
            SES_ID: sessionId
        },
        data: {
            SES_VALID: valid
        }
    });
}