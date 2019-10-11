import mongoose, { Schema, Document } from 'mongoose';

export interface IWorkshop extends Document {
    no: string; // Should be a date object
    skillSet: string; // Should be a date object
    shortTitle: string;
    status: string;
}

export interface WorkshopDetails {
    [workshopId: string]: any;
    reason: string // Taken from 'this appointment is for'
    subjectName: string;
    assignmentType: string;
    isGroupAssignment: boolean;
    additionalHelpDetails: string;
}

const WorkshopSchema: Schema = new Schema({
    no: { type: String, required: true },
    skillSet: { type: String, required: true },
    shortTitle: { type: String, required: true },
    status: { type: String, required: true }
});

export default mongoose.model<IWorkshop>('Workshop', WorkshopSchema);