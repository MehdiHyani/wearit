import sanitize from 'mongo-sanitize';
import { NextFunction, Request, Response } from 'express';

function sanitizeBody(req: Request, res: Response, next: NextFunction) {
    sanitize(req.body);
    next();
}

export default sanitizeBody;