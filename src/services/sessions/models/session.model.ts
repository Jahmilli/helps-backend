import mongoose, { Schema, Document } from 'mongoose';

// Could probably be abstracted into a booking and used for workshop bookings as well
export interface ISession extends Document {
    date: string;  // Could probs remove this
    startTime: string; // Should be a date object
    endTime: string; // Should be a date object
    room: string;
    advisor: string;
    type: string;
    currentBooking: ISessionDetails;
    waitingList: Array<ISessionDetails>;
    isCurrentBooking: boolean;
    // attendedNotAttended: string; (not sure what this is)
}

interface ISessionDetails {
    studentId?: string;
    preferredName?: string;
    faculty?: string;
    status?: string;
    degree?: string;
    reason: string // Taken from 'this appointment is for'
    subjectName: string;
    assignmentType: string;
    isGroupAssignment: boolean;
    needsHelpWithOptions: IOption;
    additionalHelpDetails: string;
    additionalOptions?: IOption;
}

export interface IOption {
    key: string;
}

const SessionDetailsSchema: Schema = new Schema({
    studentId: { type: String, required: false },
    reason: { type: String, required: false },
    subjectName: { type: String, required: false },
    assignmentType: { type: String, required: false },
    isGroupAssignment: { type: Boolean, required: false },
    needsHelpWithOptions: { type: Object, required: false },
    additionalHelpDetails: { type: String, required: false },
});

const SessionSchema: Schema = new Schema({
    date: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    room: { type: String, required: true },
    advisor: { type: String, required: true },
    type: { type: String, required: true },
    currentBooking: { type: SessionDetailsSchema, required: false },
    waitingList: { type: [SessionDetailsSchema], required: false }

    // attendedNotAttended: string; (not sure what this is)
});
  
export default mongoose.model<ISession>('Session', SessionSchema);