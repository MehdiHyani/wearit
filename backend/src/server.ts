// Checking env variables
import checkEnvVariables from './utils/checkEnvVariables';

import express from 'express';
import log from './utils/logger';
import apiRouter from './routes';
import applyGlobalMiddlewares from './utils/applyGlobalMiddlewares';
import deserializeUser from './middlewares/deserializeUser';
import dotenv from 'dotenv';
dotenv.config();
checkEnvVariables();


const app = express();

applyGlobalMiddlewares(app);

app.use(deserializeUser);

app.use('/api', apiRouter);

app.listen(process.env.PORT ? process.env.PORT : 5000,
    () => log.info(
        `Postgres connected && Server started at http://localhost:
            ${process.env.PORT ? process.env.PORT : 5000}
        `
    )
);

export default app;