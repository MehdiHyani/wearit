import { CreateFeedbackInput } from '../schema/feedback.schema';
import prisma from "../utils/db";


export function getFeedbacksByProduct(productId: number) {
    return prisma.feedback.findMany({
        where: { PRO_ID: productId },
        select: {
            FDB_COMMENT: true,
            FDB_ID: true,
            FDB_CREATED: true,
            USER: {
                select: {
                    USR_ID: true,
                    USR_FIRST_NAME: true,
                    USR_LAST_NAME: true,
                }
            },
        }
    });
}

export function createFeedback(feedback: CreateFeedbackInput, userId: number) {
    return prisma.feedback.create({ data: {
        FDB_COMMENT: feedback.feedback,
        PRO_ID: feedback.productId,
        USR_ID: userId,
    }});
}