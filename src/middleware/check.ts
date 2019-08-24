import { Request, Response, NextFunction } from 'express';
import { HTTP400Error } from '../utils/httpErrors';
import { ISession } from '../services/sessions/models/session.model';

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

export const checkSessionParams = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.body) {
        throw new HTTP400Error('Missing request body');
    }
    // TODO: Fix up check for map
    req.body.map((session: ISession) => {
        if (!session.date || !session.startTime || !session.endTime || !session.room || !session.type || !session.advisor) {
            throw new HTTP400Error('Missing Parameters');
        } 
    });
    next(); 
}