import mongoose, { Schema, Document } from 'mongoose';

const WorkshopDetailsSchema: Schema = new Schema({
    studentId: { type: String, required: false },
    dateBooked: { type: String, required: false },
    attended: { type: Boolean, required: false }
});

const WorkshopSessionSchema: Schema = new Schema({
    topic: { type: String, required: true },
    startDate: { type: String, required: true }, // Should be a date object
    endDate: { type: String, required: true }, // Should be a date object
    startTime: { type: String, required: true }, // Should be a date object
    endTime: { type: String, required: true }, // Should be a date object
    room: { type: String, required: true },
    maxStudents: { type: String, required: true },
    cutoff: { type: String, required: true },
    waitingList: { type: Object, required: false },
    confirmedList: { type: [WorkshopDetailsSchema], required: false },
    targetGroup: { type: String, required: false },
    sessionCoverage: { type: String, required: false },
});

const WorkshopSchema: Schema = new Schema({
    no: { type: String, required: true },
    skillSet: { type: String, required: true },
    shortTitle: { type: String, required: true },
    status: { type: String, required: true },
    singleSessions: { type: [WorkshopSessionSchema], required: false },
});


export interface IWorkshop extends Document {
    no: string;
    skillSet: string;
    shortTitle: string;
    status: string;
    singleSessions: Array<IWorkshopSession>
}

export interface IWorkshopSession {
    _id: object,
    topic: string;
    startDate: string; // Should be a date object
    endDate: string; // Should be a date object
    startTime: string; // Should be a date object
    endTime: string; // Should be a date object
    room: string;
    maxStudents: string;
    cutoff: string;
    waitingList: Array<String>
    confirmedList: Array<IWorkshopSessionDetails>;
    targetGroup: string;
    sessionCoverage: string;
}

interface IWorkshopSessionDetails {
    studentId: { type: String, required: false },
    dateBooked?: string;
    attended?: boolean;
}

export default mongoose.model<IWorkshop>('Workshop', WorkshopSchema);