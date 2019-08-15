
import { Request, Response } from 'express';
import CreateStudent from './RegistrationController';
import { IStudent } from './models/student.model'
import { checkStudentRegisterParams } from '../../middleware/check';

export default [
  {
    path: '/api/v1/student/registration',
    method: 'post',
    handler: [
      checkStudentRegisterParams,
      async (req: Request, res: Response) => {
        console.log(req.body);
        const result = await CreateStudent({email: req.body.email, firstName: req.body.firstName, lastName: req.body.lastName} as IStudent);
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