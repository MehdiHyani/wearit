import { CreateFeedbackInput } from '../schema/feedback.schema';
import prisma from "../utils/db";


export function getFeedbacksByProduct(productId: number) {
    return prisma.feedback.findMany({ where: { productId } })
}

export function createFeedback(feedback: CreateFeedbackInput, userId: number) {
    return prisma.feedback.create({ data: {...feedback, userId} })
}