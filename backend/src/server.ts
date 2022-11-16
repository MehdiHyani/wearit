// Checking env variables
import checkEnvVariables from './utils/checkEnvVariables';
require('dotenv').config();
checkEnvVariables();

import express from 'express';
import log from './utils/logger';
import apiRouter from './routes';
import applyGlobalMiddlewares from './utils/applyGlobalMiddlewares';
import deserializeUser from './middlewares/deserializeUser';


const app = express();

applyGlobalMiddlewares(app);

app.use(deserializeUser);

app.use('/', apiRouter);

app.listen(process.env.PORT!, () => log.info(`Postgres connected && Server started at http://localhost:${process.env.PORT!}`));

export default app;