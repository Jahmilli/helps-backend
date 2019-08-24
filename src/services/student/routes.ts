
import { Request, Response } from 'express';
import CreateStudent, { GetSessionsForStudent } from './StudentController';
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
    },
    {
      path: '/api/v1/student/:id/sessions',
      method: 'get',
      handler: async (req: Request, res: Response) => {
        const studentId = req.params.id;
        console.log('student id is ' + studentId);
        const result: any = await GetSessionsForStudent(studentId);

        res.status(200).send(result);
      }
    }
];