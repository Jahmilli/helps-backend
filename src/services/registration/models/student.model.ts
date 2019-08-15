import mongoose, { Schema, Document} from 'mongoose';

export interface IStudent extends Document {
    email: string;
    firstName: string;
    lastName: string;
}

const StudentSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true }
});
  
export default mongoose.model<IStudent>('Student', StudentSchema);