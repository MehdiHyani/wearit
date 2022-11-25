// Checking env variables
import checkEnvVariables from './utils/checkEnvVariables';

import express from 'express';
import log from './utils/logger';
import apiRouter from './routes';
import applyGlobalMiddlewares from './utils/applyGlobalMiddlewares';
import deserializeUser from './middlewares/deserializeUser';
import dotenv from 'dotenv';
import prisma from './utils/db';
dotenv.config();
checkEnvVariables();


const app = express();

applyGlobalMiddlewares(app);

app.use(deserializeUser);

app.use('/', apiRouter);

const port = process.env.PORT || 5000;

async function main() {
    try {
        await prisma.$connect();

        app.listen(port,
            () => log.info(
                'Postgres connected && Server started at '+
                `http://localhost:${port}`
            )
        );
    } catch (error) {
        log.error(error, "Error connecting to db.");
    }
}

main();

export default app;