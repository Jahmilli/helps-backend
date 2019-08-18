import { Request, Response } from 'express';
import CreateSessions from './SessionController';
import { ISession } from './models/session.model'
import { checkSessionParams } from '../../middleware/check';
import uuidv1 from 'uuid';

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
            const sessionID = uuidv1();
            // const _id = sessionID;
            sessionArr.push({ sessionID, date, startTime, endTime, room, type, advisor } as ISession);
        });
        console.log('\n\n\n\n');
        console.log(sessionArr);
        // Can perform validation on any of these fields if need be (Should be done from the front-end though)
        // TODO: GENERATE UUID FOR THE SESSION
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