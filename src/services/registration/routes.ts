
import { Request, Response } from 'express';
import CreateStudent from './RegistrationController';
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
        // Can perform validation on any of these fields if need be
        const {
            email, 
            studentID,
            fullName,
            preferredName,
            faculty,
            courseID,
            preferredContactNumber,
            dateOfBirth,
            gender,
            degree,
            status,
            education
        } = req.body;
        const result = await CreateStudent({email, studentID, fullName, preferredName, 
                                            faculty, courseID, preferredContactNumber, dateOfBirth,
                                            gender, degree, status, education } as IStudent);
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