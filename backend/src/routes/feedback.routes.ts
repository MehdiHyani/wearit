import { Router } from 'express';
import { createFeedbackController, getFeedbacksByProductController } from '../controllers/feedback.controller';
import validateResource from '../middlewares/validateResource';
import verifyLogin from '../middlewares/verifyLogin';
import { createFeedbackSchema, getFeedbacksByProductSchema } from '../schema/feedback.schema';

const feedbackRouter = Router();

// Public routes
feedbackRouter
    .get('/', validateResource(getFeedbacksByProductSchema), getFeedbacksByProductController);

// // Private [manager, customer] routes
feedbackRouter
    .use(verifyLogin)
    .post('/', validateResource(createFeedbackSchema), createFeedbackController);

export default feedbackRouter;