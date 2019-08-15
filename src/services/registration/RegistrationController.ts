// import { getPlaces } from "./providers/OpenCageDataProvider";
import Student, { IStudent} from './models/student.model';
import { mongo } from 'mongoose';

// export const getPlacesByName = async (q: string) => {
//   if (q.length < 3) {
//     return {
//       type: "FeatureCollection",
//       features: []
//     };
//   }

//   return await getPlaces(q);
// };

export function getUserEmailById(
    user: IStudent,
    users: IStudent[]
  ): IStudent['email'] {
    return users.filter((item: IStudent) => item._id === user._id)[0].email;
}
async function CreateStudent({ email, firstName, lastName }: IStudent): Promise<IStudent> {
    return await Student.create({
        email,
        firstName,
        lastName
    })
    .then((data: IStudent) => {
        console.log(`${data.firstName} was successfully added`);
        return data;
    })
    .catch((error: Error) => {
        throw error;
    });
}

export default CreateStudent;