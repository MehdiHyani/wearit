import { CreateFeedbackInput } from '../schema/feedback.schema';
import prisma from "../utils/db";


export function getFeedbacksByProduct(productId: number) {
    return prisma.feedback.findMany({
        where: { productId },
        select: {
            user: {
                select: {
                    firstName: true,
                    lastName: true,
                }
            }
        }
    })
}

export function createFeedback(feedback: CreateFeedbackInput, userId: number) {
    return prisma.feedback.create({ data: {...feedback, userId} })
}