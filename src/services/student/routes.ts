
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
        console.log(req.body);
        const newStudent:IStudent = req.body;
        const result = await CreateStudent(newStudent);
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