import nodemailer from 'nodemailer';
import Config from '../../../AppConfig';
import { ISession } from '../models/session.model';
import { IStudent } from '../../student/models/student.model';

// Configure the email transport using the default SMTP transport and a GMail account.
// For other types of transports such as Sendgrid see https://nodemailer.com/transports/

// const gmailEmail = functions.config().gmail.email;
// const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: Config.gmailEmail,
        pass: Config.gmailPassword,
    },
});

// Sends an email confirmation when a user changes his mailing list subscription.
// SHOULD BE PASSING IN ADMIN/STUDENT OBJECT and read from that for the message
const sendEmailConfirmation = async (session: ISession, student: IStudent): Promise<string> => {
    // const snapshot = change.after;
    // const val = snapshot.val();
    // let volunteerData = undefined;
    // let location = undefined;
    // let eventData = undefined;
    // let charityData = undefined;

    const mailOptions: any = {
        from: '"Helps-UTS." <noreply@help-uts.com>',
        to: student.email
    };

    // Building Email message.
    mailOptions.subject = 'You have been selected to help out with our event!';
    mailOptions.text = `Hello seb how are you`

    try {
        await mailTransport.sendMail(mailOptions);
        console.log(`An email was successfully sent to`);
        return 'An email was successfully sent to'
    } catch(error) {
        console.error('There was an error while sending the email:', error);
        return 'There was an error while sending the email: ' + error;
    }
};

export default sendEmailConfirmation;