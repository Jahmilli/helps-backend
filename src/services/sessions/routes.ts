import { Request, Response } from 'express';
import CreateSessions from './SessionController';
import { ISession } from './models/session.model'
import { checkSessionParams } from '../../middleware/check';

export default [
    {
    path: '/api/v1/session/create',
    method: 'post',
    handler: [
      checkSessionParams,
      async (req: Request, res: Response) => {
        console.log(req.body);
        const sessionArr: Array<ISession> = [];
        req.body.map((session: ISession) => {
            const {date, startTime, endTime, room, type, advisor} = session;
            sessionArr.push({ date, startTime, endTime, room, type, advisor } as ISession);
        });
        
        // Can perform validation on any of these fields if need be (Should be done from the front-end though)
        const result = await CreateSessions(sessionArr);
        res.status(200).send(result);
      }
    ]
    },
    {
        path: '/api/v1/test',
        method: 'get',
        handler: async (req: Request, res: Response) => {
        res.send('This is a test message from node!');
        }
    }
];