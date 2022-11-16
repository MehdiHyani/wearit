import { Router } from 'express';
import authRouter from './auth.routes';
import userRouter from './user.routes';

const apiRouter = Router();

apiRouter.get('/', async (req, res) => {
    res.status(200).send('WEARIT API running perfectly');
});

apiRouter.use('/auth', authRouter);

apiRouter.use('/users', userRouter);

export default apiRouter;