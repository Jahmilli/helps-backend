import mongoose, { Schema, Document} from 'mongoose';

// Could probably be abstracted into a booking and used for workshop bookings as well
export interface ISession extends Document {
    sessionID?: string;
    date: string;  // Could probs remove this
    startTime: string; // Should be a date object
    endTime: string; // Should be a date object
    room: string;
    advisor: string;
    type: string;
    bookedBy?: string;
    // attendedNotAttended: string; (not sure what this is)
    // waiting: string; (Not sure what this is)
}

const SessionSchema: Schema = new Schema({
    // _id: { type: String, required: true },
    sessionID: { type: String, required: false, unique: true },
    date: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    room: { type: String, required: true },
    advisor: { type: String, required: true },
    type: { type: String, required: true },
    bookedBy: { type: String, required: false },
    // attendedNotAttended: string; (not sure what this is)
    // waiting: string; (Not sure what this is)
});
  
export default mongoose.model<ISession>('Session', SessionSchema);