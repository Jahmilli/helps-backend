import Session, { ISession, ICheckbox} from './models/session.model';
import { GetStudentByStudentId } from '../student/StudentController';
import sendEmailConfirmation from './services.ts/email';
import { HTTP400Error, HTTP500Error } from '../../utils/httpErrors';

export async function CreateSessions(sessions: Array<ISession>): Promise<Array<ISession>> {
    return await Session.insertMany(sessions).then(res => {
        return res;
    }).catch(err => {
        console.log('an error occurred', err);
        throw new HTTP500Error();
    });
}

export async function BookSession(session: ISession): Promise<ISession> {
    console.log(session);
    const bookingDetails = session.isCurrentBooking ? session.currentBooking : session.waitingList[session.waitingList.length-1];
    console.log('is currentBooking ' + session.isCurrentBooking);
    
    // Verify student exists and get their details
    const student = await GetStudentByStudentId(bookingDetails.studentId || '');
    if (!student) {
        throw new HTTP400Error("Student does not exist");
    }

    let updateSessions;
    if (session.isCurrentBooking) {
        updateSessions = await addToCurrentBooking(session, bookingDetails);
    } else {
        updateSessions = await addToWaitingList(session, bookingDetails);
    }

    const additionalOptions = session.currentBooking.additionalOptions || [];
    console.log('additional options are: ', additionalOptions);
    //@ts-ignore
    if (additionalOptions.emailAdmin) {
        // Need to add in admin interface user setup etc
    }
    //@ts-ignore
    if (additionalOptions.emailStudent) {
        let emailSent = await sendEmailConfirmation(session, student);
    }
    
    return updateSessions;
}

export async function addToCurrentBooking(session: ISession, bookingDetails: any): Promise<ISession> {
    return await Session.updateOne({_id: session._id}, { $set: 
        { currentBooking: bookingDetails }
     }, (err, res) => {
        if (err) {
            console.log('an error occurred when updating', err);
            throw err;
        }
        return res;
    });  
}

export async function addToWaitingList(session: ISession, bookingDetails: any): Promise<ISession> {
    return await Session.updateOne({_id: session._id}, { $addToSet: 
        { waitingList: bookingDetails }
     }, (err, res) => {
        if (err) {
            console.log('an error occurred when updating', err);
            throw err;
        }
        return res;
    }); 
}


export async function GetSessions(): Promise<Array<ISession>> {
    return await Session.find({}, (err, session) => {
        if (err) {
            throw err;
        }
        return session;
    });
}