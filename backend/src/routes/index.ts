import express, { Router } from 'express';
import path from 'path';
import app from '../server';
import authRouter from './auth.routes';
import userRouter from './user.routes';

const apiRouter = Router();

apiRouter.get('/', async (req, res) => {
    res.status(200).send('WEARIT API running perfectly')
});

if(process.env.NODE_ENV === 'production'){
    // Serving the app
    apiRouter.use(express.static(path.join(__dirname, 'build')))
    apiRouter.get('/*', function (req, res) {
        res.sendFile(path.join(__dirname, 'build', 'index.html'));
    });
}

apiRouter.use('/auth', authRouter);

apiRouter.use('/users', userRouter);

export default apiRouter;