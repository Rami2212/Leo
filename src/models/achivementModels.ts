/** @format */

import mongoose, { Schema, Document } from "mongoose";
interface IAchivement extends Document {
  name: string;
  description: string;
  content: string;
  featuredImage: string;
}

const achivementSchema: Schema = new Schema({
  name: { type: String, require: true },
  description: { type: String, require: true },
  content: { type: String, require: true },
  featuredImage: { type: String, require: false },
});

export default mongoose.model<IAchivement>("Achivements", achivementSchema);
