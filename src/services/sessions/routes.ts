import { Request, Response } from 'express';
import { BookSession, CreateSessions, GetAllSessions, GetAllSessionsForReports } from './SessionController';
import { ISession } from './models/session.model'
import { checkSessionParams } from '../../middleware/check';

export default [
    {
      path: '/api/v1/session/create',
      method: 'post',
      handler: [
        checkSessionParams,
        async (req: Request, res: Response) => {
          const result: Array<ISession> = await CreateSessions(req.body);
          res.status(200).send(result);
        }
      ]
    },
    {
      path: '/api/v1/session/book',
      method: 'post',
      handler: [
        // checkSessionParams,
        async (req: Request, res: Response) => {
          const result: ISession = await BookSession(req.body);
          res.status(200).send(result);
        }
      ]
    },
    {
      path: '/api/v1/session/reports',
      method: 'get',
      handler: async (req: Request, res: Response) => {
        const result: Array<ISession> = await GetAllSessionsForReports();
        res.status(200).send(result);
      }
    },
    {
      path: '/api/v1/session',
      method: 'get',
      handler: async (req: Request, res: Response) => {
        const result: Array<ISession> = await GetAllSessions();
        res.status(200).send(result);
      }
    }
];