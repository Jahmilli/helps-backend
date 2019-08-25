import Session, { ISession } from './models/session.model';
import { GetStudent, AddSessionForStudent } from '../student/StudentController';
import sendEmailConfirmation from './services.ts/email';
import { HTTP400Error, HTTP500Error } from '../../utils/httpErrors';

export async function CreateSessions(sessions: Array<ISession>): Promise<Array<ISession>> {
    return await Session.insertMany(sessions).then(res => {
        return res;
    }).catch(err => {
        console.error('an error occurred', err);
        throw new HTTP500Error('An error occurred when creating sessions');
    });
}

export async function BookSession(session: ISession): Promise<ISession> {
    console.log(session);
    const bookingDetails = session.isCurrentBooking ? session.currentBooking : session.waitingList[session.waitingList.length-1];
    
    // Verify student exists and get their details
    const student = await GetStudent({ studentId: bookingDetails.studentId } || { studentId: '' });
    if (!student) {
        throw new HTTP400Error('Student does not exist');
    }

    // Add booking details to session
    let updateSessions;
    if (session.isCurrentBooking) {
        updateSessions = await addToCurrentBooking(session, bookingDetails);
    } else {
        updateSessions = await addToWaitingList(session, bookingDetails);
    }

    await AddSessionForStudent(student._id, session._id);

    const additionalOptions = session.currentBooking.additionalOptions ||  [];
    // @ts-ignore
    if (additionalOptions.emailAdmin) {
        // Need admin users in the database first
    }
    // @ts-ignore
    if (additionalOptions.emailStudent) {
        sendEmailConfirmation(session, student);
    }
    
    return updateSessions;
}

// Adds booking to the currentBookingField for a session
export async function addToCurrentBooking(session: ISession, bookingDetails: any): Promise<ISession> {
    return await Session.updateOne({_id: session._id}, { $set: 
        { currentBooking: bookingDetails }
     }, (err, res) => {
        if (err) {
            console.error('An error occurred when updating', err);
            throw new HTTP500Error('An error occurred when booking the session');
        }
        return res;
    });  
}

// Pushes the booking into the waitingList
export async function addToWaitingList(session: ISession, bookingDetails: any): Promise<ISession> {
    return await Session.updateOne({_id: session._id}, { $addToSet: 
        { waitingList: bookingDetails }
     }, (err, res) => {
        if (err) {
            console.error('an error occurred when updating', err);
            throw new HTTP500Error('An error occurred when booking the session');
        }
        return res;
    }); 
}


export async function GetAllSessions(): Promise<Array<ISession>> {
    return await Session.find({}, (err, session) => {
        if (err) {
            console.error(err);
            throw new HTTP500Error('An error occurred when getting the sessions');
        }
        return session;
    });
}

export async function GetSessionById(_id: string): Promise<ISession | null> {
    return await Session.findOne({ _id }, (err, session) => {
        if (err) {
            console.error(err);
            throw new HTTP500Error('An error occurred when getting the sessions');
        }
        return session;
    });
}