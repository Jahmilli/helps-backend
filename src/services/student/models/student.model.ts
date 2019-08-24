import mongoose, { Schema, Document} from 'mongoose';

export interface IStudent extends Document {
    email: string; 
    studentId: string;
    fullName: string;
    preferredName: string;
    faculty: string;
    courseId: string;
    preferredContactNumber: string;
    dateOfBirth: string;
    gender: string;
    degree: string;
    status: string;
    education?: Array<Course>;
    upcomingSessions: IStudentSessions;
    previousSessions: IStudentSessions;
}

export interface IStudentSessions {
    sessions: Array<string>;
    workshopSessions: Array<string>;
}

export interface Course {
    title: string;
    mark: number;
}

const StudentSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    studentId: { type: String, required: true},
    fullName: { type: String, required: true },
    preferredName: { type: String, required: true },
    faculty: { type: String, required: true },
    courseId: { type: String, required: true },
    preferredContactNumber: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    gender: { type: String, required: true },
    degree: { type: String, required: true },
    status: { type: String, required: true },
    education: { type: [Object], required: true },
    upcomingSessions: { type: Object, required: true },
    previousSessions: { type: Object, required: true }
});
  
export default mongoose.model<IStudent>('Student', StudentSchema);