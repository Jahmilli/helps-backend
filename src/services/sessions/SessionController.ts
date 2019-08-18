import Session, { ISession} from './models/session.model';

// export function getUserEmailById(
//     user: ISession,
//     users: ISession[]
//   ): ISession['email'] {
//     return users.filter((item: ISession) => item._id === user._id)[0].email;
// }

async function CreateSession(sessions: any): Promise<ISession> {
    return await Session.insertMany(sessions).then(res => {
        console.log('response successful');
        console.log(res);
        return res;
    }).catch(err => {
        console.log('an error occurred', err);
        return err;
    });
}

export default CreateSession;