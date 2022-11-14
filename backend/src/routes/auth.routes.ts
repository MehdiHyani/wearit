import { Router } from 'express';
import { loginController, logoutController, refreshTokenController } from '../controllers/auth.controller';
import validateResource from '../middlewares/validateResource';
import { loginSchema } from '../schema/auth.schema';

const authRouter = Router();

// Public routes
authRouter
    .post('/login', validateResource(loginSchema), loginController)
    .get('/refresh', refreshTokenController)
    .get('/logout', logoutController);

export default authRouter;