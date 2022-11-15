import { Router } from 'express';
import {
    createUserController,
    editCurrentUserController,
    editUserController,
    getCurrentUserController,
} from '../controllers/user.controller';
import validateResource from '../middlewares/validateResource';
import verifyLogin from '../middlewares/verifyLogin';
import verifyManager from '../middlewares/verifyManager';
import {
    createUserSchema, editCurrentUserSchema, editUserSchema
} from '../schema/user.schema';

const userRouter = Router();

// Public routes
userRouter.post('/', validateResource(createUserSchema), createUserController);

// Private [manager,customer] routes
userRouter
    .use(verifyLogin)
    .get('/me', getCurrentUserController)
    .patch('/me/edit', validateResource(editCurrentUserSchema), editCurrentUserController)

// Private [manager] routes
userRouter
    .use(verifyLogin)
    .use(verifyManager)
    .patch('/:userId', validateResource(editUserSchema), editUserController)

export default userRouter;