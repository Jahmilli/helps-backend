import Session, { ISession} from './models/session.model';

export async function CreateSessions(sessions: Array<ISession>): Promise<Array<ISession>> {
    return await Session.insertMany(sessions).then(res => {
        return res;
    }).catch(err => {
        console.log('an error occurred', err);
        return err;
    });
}

export async function BookSession(session: ISession): Promise<ISession> {
    const { studentId, reason, subjectName, assignmentType, isGroupAssignment, needsHelpWith } = session;
    return await Session.updateOne({_id: session._id}, { $set: { studentId, reason, subjectName, assignmentType, isGroupAssignment, needsHelpWith } }, (err, res) => {
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