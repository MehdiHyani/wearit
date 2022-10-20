import { NextFunction, Request, Response } from 'express';

function verifyLogin(req: Request, res: Response, next: NextFunction) {
    const { user } = res.locals;

    if (!user) {
        return res.sendStatus(403);
    }

    return next();
}

export default verifyLogin;