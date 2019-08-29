
import { Request, Response } from 'express';
import CreateStudent, { GetStudent } from './StudentController';
import { IStudent } from './models/student.model'
import { checkStudentRegisterParams } from '../../middleware/check';
import { GetSessionById } from '../sessions/SessionController';
import { HTTP400Error, HTTP500Error } from '../../utils/httpErrors';

export default [
    {
        path: '/api/v1/student/register',
        method: 'post',
        handler: [
            checkStudentRegisterParams,
            async (req: Request, res: Response) => {
                const result = await CreateStudent(req.body);
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
    },
    {
        path: '/api/v1/die',
        method: 'get',
        handler: async (req: Request, res: Response) => {
            throw new HTTP500Error("Kill the server!");
        }
    },
    {
        path: '/api/v1/student/:id/sessions',
        method: 'get',
        handler: async (req: Request, res: Response) => {
            const studentId = req.params.id;
            const student: IStudent | null = await GetStudent({ studentId });

            if (!student) {
                throw new HTTP400Error('Student does not exist');
            }

            const sessionPromises = student.upcomingSessions.sessionIds.map(async (sessionId: string) => {
                return GetSessionById(sessionId);
            });
            // Maybe will be worth filtering out data here...
            const sessions = await Promise.all(sessionPromises);
            res.status(200).send(sessions);
        }
    },
    {
        path: '/api/v1/student/:_id/details',
        method: 'get',
        handler: async (req: Request, res: Response) => {
            const _id = req.params._id;
            const student: IStudent | null = await GetStudent({ _id });
            if (!student) {
                throw new HTTP400Error('Student does not exist');
            }
            res.status(200).send(student);
        }
    }
];