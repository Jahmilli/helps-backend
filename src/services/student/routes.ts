
import { Request, Response } from 'express';
import CreateStudent from './StudentController';
import { IStudent } from './models/student.model'
import { checkStudentRegisterParams } from '../../middleware/check';

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
    }
];