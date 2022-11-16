import { CreateFeedbackInput } from '../schema/feedback.schema';
import prisma from "../utils/db";


export function getFeedbacksByProduct(productId: number) {
    return prisma.feedback.findMany({
        where: { productId },
        select: {
            feedback: true,
            id: true,
            createdAt: true,
            user: {
                select: {
                    id: true,
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