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
    console.log(session.currentBooking);
    const { studentId, reason, subjectName, assignmentType, isGroupAssignment, needsHelpWithOptions, additionalHelpDetails } = session.currentBooking;
    const student = await GetStudentByStudentId(studentId || '');
    if (!student) {
        throw new HTTP400Error("Student does not exist");
    }

    let updateSessions = await Session.updateOne({_id: session._id}, { $set: { currentBooking: { studentId, reason, subjectName, assignmentType, isGroupAssignment, needsHelpWithOptions, additionalHelpDetails } } }, (err, res) => {
        if (err) {
            console.log('an error occurred when updating', err);
            throw err;
        }
        return res;
    });

    const additionalOptions = session.currentBooking.additionalOptions || [];
    console.log('additional options are: ', additionalOptions);
    //@ts-ignore
    if (additionalOptions.emailAdmin) {
        let emailSent = await sendEmailConfirmation(session, student);
    }
    //@ts-ignore
    if (additionalOptions.emailStudent) {
        // Need to add in admin interface user setup etc
    }
    
    return updateSessions;
}


export async function GetSessions(): Promise<Array<ISession>> {
    return await Session.find({}, (err, session) => {
        if (err) {
            throw err;
        }
        return session;
    });
}