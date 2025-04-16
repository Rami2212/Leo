/** @format */

import mongoose, { Schema, Document } from "mongoose";
interface IEvaluation extends Document {
  name: string;
  description: string;
  content: string;
  featuredImage: string;
  month: string;
}
const evaluationSchema: Schema = new Schema(
  {
    name: { type: String, require: true },
    description: { type: String, require: true },
    content: { type: String, require: true },
    featuredImage: { type: String, require: true },
    month: { type: String, require: true },
  },
  { timestamps: true },
);

export default mongoose.model<IEvaluation>("Evaluation", evaluationSchema);
