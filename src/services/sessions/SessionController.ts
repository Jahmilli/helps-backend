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

    const additionalOptions: any = session.currentBooking.additionalOptions ||  [];
    if (additionalOptions.emailAdmin) {
        // Need admin users in the database first
    }
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

// This is pretty bad to do but because this code will likely never be looked at again, 
// we're just gonna do a a huge ass query that returns all sessions and student data for that booking. (I know, this is really not good....)
// Basically same as getAllSessions but returns student details as well
export async function GetAllSessionsForReports(): Promise<Array<any>> {
    let sessions = await Session.find({}, (err, session) => {
        if (err) {
            console.error(err);
            throw new HTTP500Error('An error occurred when getting the sessions');
        }
        return session;
    })
    .lean(); // This alters the returning result from a Mongoose 'Query' into a plain Javascript Object

    // Iterate over sessions and do a lookup to get student data which is needed
    let results = sessions.map(async (session: any) => {
        let result = {
            ...session
        }
        if (session.currentBooking) {
            const { studentId } = session.currentBooking;
            if (studentId) {
                let studentDetails = await GetStudent({ studentId });
                if (studentDetails) {
                    const { fullName, preferredName, faculty, degree, status } = studentDetails;
                  // Add in student details here
                  result.currentBooking = {
                      ...result.currentBooking,
                      fullName,
                      preferredName,
                      faculty,
                      degree,
                      status
                  }
                }
            }
        }
        return result;
    });
    const finalResults = await Promise.all(results);
    return finalResults;
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
            throw new HTTP500Error('An error occurred when getting the session');
        }
        return session;
    });
}