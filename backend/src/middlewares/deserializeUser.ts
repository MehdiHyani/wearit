import { NextFunction, Request, Response } from 'express';
import { verifyJwt } from '../utils/jwt';

async function deserializeUser(req: Request, res: Response, next: NextFunction) {
    const accessToken = (req?.cookies?.accessToken || '').replace(/^Bearer\s/, '');

    if (!accessToken) {
        return next();
    }

    const decoded = verifyJwt(accessToken, Buffer.from(process.env.ACCESS_TOKEN_PUBLIC_KEY!, 'base64').toString('ascii'));

    if (decoded) {
        res.locals.user = decoded;
    }

    return next();
}

export default deserializeUser;