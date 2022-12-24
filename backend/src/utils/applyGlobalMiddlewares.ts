import { Express, json, urlencoded } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookies from 'cookie-parser';

function applyGlobalMiddlewares(expressApp: Express) {
    expressApp.enable('trust proxy');
    expressApp.set('trust proxy', true);
    expressApp.use(cookies());
    expressApp.use(json());
    expressApp.use(urlencoded({ extended: true }));
    expressApp.use(cors({
        origin: process.env.NODE_ENV === 'production' ? process.env.CLIENT_URL : '*',
        credentials: true,
    }));
    expressApp.use(helmet());
    expressApp.use(morgan(':method :url :status - :response-time ms'));
}

export default applyGlobalMiddlewares;