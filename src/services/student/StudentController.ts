import Student, { IStudent} from './models/student.model';

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
        throw error;
    });
}

export default CreateStudent;