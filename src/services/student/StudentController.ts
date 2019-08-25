import Student, { IStudent } from './models/student.model';
import { HTTP500Error } from '../../utils/httpErrors';

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
export async function GetStudent(queryParam: any): Promise<IStudent | null> {
    return await Student.findOne(queryParam, function (err, student) {
        if (err) {
            console.error('An error occurred when searching for a student');
            throw new HTTP500Error('An error occurred when searching for the student');
        }
        if (!student) {
            console.log('No student was found with the query param', queryParam);
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