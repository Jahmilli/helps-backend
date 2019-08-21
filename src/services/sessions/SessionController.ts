import Session, { ISession, ICheckbox} from './models/session.model';
import { GetStudentByStudentId } from '../student/StudentController';
import sendEmailConfirmation from './services.ts/email';
import { HTTP400Error } from '../../utils/httpErrors';

export async function CreateSessions(sessions: Array<ISession>): Promise<Array<ISession>> {
    return await Session.insertMany(sessions).then(res => {
        return res;
    }).catch(err => {
        console.log('an error occurred', err);
        return err;
    });
}

export async function BookSession(session: ISession): Promise<ISession> {
    const { studentId, reason, subjectName, assignmentType, isGroupAssignment, needsHelpWithOptions } = session;
    const student = await GetStudentByStudentId(studentId || '');
    if (!student) {
        throw new HTTP400Error("Student does not exist");
    }

    let updateSessions = await Session.updateOne({_id: session._id}, { $set: { studentId, reason, subjectName, assignmentType, isGroupAssignment, needsHelpWithOptions } }, (err, res) => {
        if (err) {
            console.log('an error occurred when updating', err);
            throw err;
        }
        return res;
    });

    session.additionalOptions = session.additionalOptions || [];

    for (let index in session.additionalOptions) {
        const option = session.additionalOptions[index];
        if (option.id === 'emailStudent' && option.value) {
            let emailSent = await sendEmailConfirmation(session, student);
        } else if (option.id === 'emailAdmin' && option.value) {
            // Need to add in admin interface user setup etc
        }
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

export async function EmailRecipients(recipients: Array<any>): Promise<any> {

    for (let recipient of recipients) {
        if (recipient.value = true) {
            let response = await sendEmailConfirmation('sebastian.southern@gmail.com');
        }
    }
    return Promise.resolve(response);
}