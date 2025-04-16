/** @format */
import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
  email: string;
  name: string;
  lastName: string;
  dob: string;
  studentId: string;
  faculty: string;
  department: string;
  avenue: string;
  mobileNumber: string;
  role: string;
  password: string;
}

const userSchema: Schema = new Schema(
  {
    email: { type: String, require: true, unique: true },
    name: { type: String, require: true },
    role: { type: String, require: true },
    dob: { type: String, require: true },
    password: { type: String, require: true },
    lastName: { type: String, require: true },
    studentId: { type: String, require: true, unique: true },
    faculty: { type: String, require: true },
    department: { type: String, require: true },
    avenue: { type: String, require: false },
    mobileNumber: { type: String, require: true },
  },
  { timestamps: true },
);

export default mongoose.model<IUser>("Users", userSchema);
