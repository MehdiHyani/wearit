import { NextFunction, Request, Response } from 'express';
import { Role } from '@prisma/client';

function verifyManager(req: Request, res: Response, next: NextFunction) {
    const { user } = res.locals;
    if (user.USR_ROLE !== Role.manager) {
        return res.sendStatus(403);
    }

    return next();
}

export default verifyManager;