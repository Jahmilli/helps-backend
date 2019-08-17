import { Request, Response, NextFunction } from 'express';
import { HTTP400Error } from '../utils/httpErrors';

export const checkStudentRegisterParams = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.body.email || !req.body.fullName) {
        throw new HTTP400Error('Missing Parameters');
    } else {
        next();
    }
}