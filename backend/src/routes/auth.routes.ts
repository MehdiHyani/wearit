import { Router } from 'express';
import { loginController, logoutController, refreshTokenController } from '../controllers/auth.controller';
import validateResource from '../middlewares/validateResource';
import { loginSchema } from '../schema/auth.schema';

const authRouter = Router();

authRouter.post('/login', validateResource(loginSchema), loginController);

authRouter.get('/refresh', refreshTokenController);

authRouter.get('/logout', logoutController);

export default authRouter;