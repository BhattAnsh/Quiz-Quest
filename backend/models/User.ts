import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
    username: string;
    name: string;
    email: string;
    password: string;
    previousQuizzes: string[];
    liveQuizzes: string[];
    picture: string
}

const UserSchema = new Schema({
    username: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    previousQuizzes: { type: [String], default: [] },
    liveQuizzes: { type: [String], default: [] },
    picture: {type: String, default:""}
});

export default mongoose.model<IUser>('User', UserSchema);
