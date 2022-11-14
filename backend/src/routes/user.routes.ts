import { Router } from 'express';
import {
    createUserController,
    getCurrentUserController,
} from '../controllers/user.controller';
import validateResource from '../middlewares/validateResource';
import verifyLogin from '../middlewares/verifyLogin';
import {
    createUserSchema
} from '../schema/user.schema';

const userRouter = Router();

// Public routes
userRouter.post('/', validateResource(createUserSchema), createUserController);

// Private [manager,customer] routes
userRouter
    .use(verifyLogin)
    .get('/me', getCurrentUserController);

export default userRouter;