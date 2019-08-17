import mongoose, { Schema, Document} from 'mongoose';

export interface IStudent extends Document {
    email: string | Course;
    studentID: string;
    fullName: string;
    preferredName: string;
    faculty: string;
    courseID: string;
    preferredContactNumber: string;
    dateOfBirth: string;
    gender: string;
    degree: string;
    status: string;
    education?: Array<Course>;
}

export interface Course {
    title: string;
    mark: number;
}

const CourseSchema: Schema = new Schema({
    title: { type: String, required: true },
    mark: { type: Number, required: false }
});

const StudentSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    studentID: { type: String, required: true},
    fullName: { type: String, required: true },
    preferredName: { type: String, required: true },
    faculty: { type: String, required: true },
    courseID: { type: String, required: true },
    preferredContactNumber: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    gender: { type: String, required: true },
    degree: { type: String, required: true },
    status: { type: String, required: true },
    education: { type: [CourseSchema], required: false },
});
  
export default mongoose.model<IStudent>('Student', StudentSchema);