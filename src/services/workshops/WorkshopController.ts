import Workshop, { IWorkshop } from './models/workshop.model';
import { GetStudent } from '../student/StudentController';
import { HTTP400Error, HTTP500Error } from '../../utils/httpErrors';

export async function CreateWorkshops(workshop: IWorkshop): Promise<IWorkshop> {
    return await Workshop.create(workshop).then(res => {
        return res;
    }).catch(err => {
        console.error('an error occurred', err);
        throw new HTTP500Error('An error occurred when creating workshops');
    });
}

// This is pretty bad to do but because this code will likely never be looked at again, 
// we're just gonna do a a huge ass query that returns all workshops and student data for that booking. (I know, this is really not good....)
// Basically same as getAllWorkshops but returns student details as well
export async function GetAllWorkshopsForReports(): Promise<Array<any>> {
    let workshops = await Workshop.find({}, (err, workshop) => {
        if (err) {
            console.error(err);
            throw new HTTP500Error('An error occurred when getting the workshops');
        }
        return workshop;
    })
    .lean(); // This alters the returning result from a Mongoose 'Query' into a plain Javascript Object

    // Iterate over workshops and if they have a "current booking", do a lookup to add the student details for that booking
    let results = workshops.map(async (workshop: any) => {
        if (workshop.currentBooking) {
            const { studentId } = workshop.currentBooking;
            if (studentId) {
                let studentDetails = await GetStudent({ studentId });
                if (studentDetails) {
                    const { fullName, preferredName, faculty, degree, status } = studentDetails;
                  // Add in student details here
                  workshop.currentBooking = {
                      ...workshop.currentBooking,
                      fullName,
                      preferredName,
                      faculty,
                      degree,
                      status
                  }
                }
            }
        }
        return workshop;
    });
    return await Promise.all(results);
}

export async function GetAllWorkshops(): Promise<Array<IWorkshop>> {
    return await Workshop.find({}, (err, workshop) => {
        if (err) {
            console.error(err);
            throw new HTTP500Error('An error occurred when getting the workshops');
        }
        return workshop;
    });
}

export async function GetWorkshopById(_id: string): Promise<IWorkshop | null> {
    return await Workshop.findOne({ _id }, (err, workshop) => {
        if (err) {
            console.error(err);
            throw new HTTP500Error('An error occurred when getting the workshop');
        }
        return workshop;
    });
}

export async function ReplaceWorkshopById(_id: string, workshop: IWorkshop): Promise<IWorkshop | null> {
    return await Workshop.findOneAndUpdate({_id}, workshop).then(res => {
        return res;
    }).catch(err => {
        console.error('an error occurred', err);
        throw new HTTP500Error('An error occurred when updating workshops');
    })
}