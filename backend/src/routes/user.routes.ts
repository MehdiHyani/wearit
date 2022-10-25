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

userRouter.post('/', validateResource(createUserSchema), createUserController);

userRouter.get('/me', verifyLogin, getCurrentUserController);

export default userRouter;