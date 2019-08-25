import Student, { IStudent, IStudentSessionIds} from './models/student.model';
import { HTTP500Error } from '../../utils/httpErrors';

export function getUserEmailById(
    user: IStudent,
    users: IStudent[]
  ): IStudent['email'] {
    return users.filter((item: IStudent) => item._id === user._id)[0].email;
}

async function CreateStudent(student: IStudent): Promise<IStudent> {
    return await Student.create(student)
    .then((data: IStudent) => {
        console.log(`${data.fullName} was successfully added`);
        return data;
    })
    .catch((error: Error) => {
        console.error(error);
        throw new HTTP500Error('Error occurred when creating student');
    });
}

// Returns a student object based on the studentId
export async function GetStudentByStudentId(studentId: string): Promise<IStudent | null> {
    return await Student.findOne({ studentId }, function (err, student) {
        if (err) {
            console.error(`An error occurred when searching for ${studentId}`);
            throw new HTTP500Error('An error occurred when searching for the student');
        }
        if (!student) {
            console.log(`No student was found with the id ${studentId}`);
            return;
        }
        return student;
    });
}

export async function AddSessionForStudent(_id: string, sessionId: string) {
    return await Student.updateOne({ _id }, { $addToSet: 
         { 'upcomingSessions.sessionIds': sessionId } 
     }, (err, res) => {
        if (err) {
            console.error('an error occurred when updating', err);
            throw new HTTP500Error('An error occurred when booking the session');
        }
        return res;
    }); 
}

export default CreateStudent;