import { Request, Response } from 'express';
import { GetAllSessions, CreateSession, ReplaceSessionById } from '../WorkshopSessionController';
import { IWorkshop } from '../models/workshop.model'
import { checkWorkshopSessionParams } from '../../../middleware/check';

export default [
    {
        path: '/api/v1/workshop/:workshopId/sessions',
        method: 'get',
        handler: async (req: Request, res: Response) => {
            const workshopId = req.params.workshopId;
            const result: IWorkshop | null = await GetAllSessions(workshopId);
            res.status(200).send(result.singleSessions);
        }
    },
    {
        path: '/api/v1/workshop/:workshopId/session',
        method: 'post',
        handler: [
            checkWorkshopSessionParams,
            async (req: Request, res: Response) => {
                const workshopId = req.params.workshopId;
                const result: IWorkshop = await CreateSession(workshopId, req.body);
                res.status(200).send(result);
            }
        ]
    },
    {
        path: '/api/v1/workshop/:workshopId/update/:sessionId',
        method: 'put',
        handler: async (req: Request, res: Response) => {
            const workshopId = req.params.workshopId;
            const sessionId = req.params.sessionId;
            const result = await ReplaceSessionById(workshopId, sessionId, req.body);
            res.status(200).send(result);
        }
    }
];