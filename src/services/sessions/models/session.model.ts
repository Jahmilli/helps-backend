import mongoose, { Schema, Document} from 'mongoose';

// Could probably be abstracted into a booking and used for workshop bookings as well
export interface ISession extends Document {
    date: string;  // Could probs remove this
    startTime: string; // Should be a date object
    endTime: string; // Should be a date object
    room: string;
    advisor: string;
    type: string;
    studentId?: string;
    reason: string // Taken from 'this appointment is for'
    subjectName: string;
    assignmentType: string;
    isGroupAssignment: boolean;
    needsHelpWith: NeedsHelpWith;
    // attendedNotAttended: string; (not sure what this is)
    // waiting: string; (Not sure what this is)
}

export interface NeedsHelpWith {
    [key: string]: boolean;
}

const SessionSchema: Schema = new Schema({
    date: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    room: { type: String, required: true },
    advisor: { type: String, required: true },
    type: { type: String, required: true },
    studentId: { type: String, required: false },
    reason: { type: String, required: false },
    subjectName: { type: String, required: false },
    assignmentType: { type: String, required: false },
    isGroupAssignment: { type: Boolean, required: false },
    needsHelpWith: { type: Object, required: false },
    // attendedNotAttended: string; (not sure what this is)
    // waiting: string; (Not sure what this is)
});
  
export default mongoose.model<ISession>('Session', SessionSchema);