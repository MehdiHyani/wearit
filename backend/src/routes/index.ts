import { Router } from 'express';
import authRouter from './auth.routes';
import availabilityRouter from './availability.routes';
import feedbackRouter from './feedback.routes';
import productRouter from './product.routes';
import storeRouter from './store.routes';
import userRouter from './user.routes';

const apiRouter = Router();

apiRouter.get('/', async (req, res) => {
    res.status(200).send('WEARIT API running perfectly')
});

apiRouter.use('/auth', authRouter);

apiRouter.use('/users', userRouter);

apiRouter.use('/stores', storeRouter);

apiRouter.use('/feedbacks', feedbackRouter);

apiRouter.use('/products', productRouter);

apiRouter.use('/availabilities', availabilityRouter);

// apiRouter.use('/orders');

export default apiRouter;