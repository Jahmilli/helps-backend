import Workshop, { IWorkshop, IWorkshopSession } from './models/workshop.model';
import { HTTP500Error } from '../../utils/httpErrors';

export async function GetAllSessions(workshopId: string): Promise<IWorkshop | null> {
    return await Workshop.findOne({ _id: workshopId }, (err, workshop) => {
        if (err || workshop === null) {
            console.error(err);
            throw new HTTP500Error('An error occurred when getting the workshops');
        }
        return workshop;
    });
}

export async function CreateSession(workshopId: string, session: IWorkshopSession): Promise<IWorkshop> {
    return await Workshop.updateOne({ _id: workshopId }, {
        $addToSet: { 'singleSessions': session }
    }, (err, res) => {
        if (err) {
            console.error('an error occurred when updating', err);
            throw new HTTP500Error('An error occurred when booking the session');
        }
        return res;
    });
}

export async function ReplaceSessionById(workshopId: string, sessionId: string, newSession: IWorkshopSession): Promise<IWorkshop | null> {
    return await Workshop.findOne({ _id: workshopId }, (err, workshop) => {
        if (err || workshop === null) {
            console.error(err);
            throw new HTTP500Error('An error occurred when getting the workshops');
        }

        var foundSessionIndex = workshop.singleSessions.findIndex(obj => {
            return String(obj._id) === String(newSession._id)
        })
        workshop.singleSessions[foundSessionIndex] = newSession;

        Workshop.updateOne({ _id: workshopId }, workshop).then(res => {
            return res;
        }).catch(err => {
            console.error('an error occurred', err);
            throw new HTTP500Error('An error occurred when updating workshops');
        })
    });
}