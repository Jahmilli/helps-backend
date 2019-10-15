import Workshop, { IWorkshop } from './models/workshop.model';
import { HTTP500Error } from '../../utils/httpErrors';

export async function CreateWorkshops(workshop: IWorkshop): Promise<IWorkshop> {
    return await Workshop.create(workshop).then(res => {
        return res;
    }).catch(err => {
        console.error('an error occurred', err);
        throw new HTTP500Error('An error occurred when creating workshops');
    });
}

export async function GetAllWorkshops(): Promise<Array<IWorkshop> | null> {
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
    return await Workshop.findOneAndUpdate({ _id }, workshop).then(res => {
        return res;
    }).catch(err => {
        console.error('an error occurred', err);
        throw new HTTP500Error('An error occurred when updating workshops');
    })
}