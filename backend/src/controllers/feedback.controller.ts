import { User } from "@prisma/client";
import { Request, Response } from "express";
import { CreateFeedbackInput, getFeedbacksByProductInput } from "../schema/feedback.schema";
import { createFeedback, getFeedbacksByProduct } from "../services/feedback.service";

export async function getFeedbacksByProductController(req: Request<{}, {}, getFeedbacksByProductInput>, res: Response) {
    try {
        const { body: { productId } } = req;
        const feedbacks = await getFeedbacksByProduct(productId);
        return res.send(feedbacks);
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function createFeedbackController(req: Request<{}, {}, CreateFeedbackInput>, res: Response) {
    try {
        const { body: feedback } = req;
        const userId = (res.locals.user as Partial<User>).id!;
        await createFeedback(feedback, userId);
        return res.sendStatus(201);
    } catch (error) {
        res.status(500).send(error);
    }
}