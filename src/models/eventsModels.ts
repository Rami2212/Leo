/** @format */

import mongoose, { Schema, Document } from "mongoose";
interface IEvent extends Document {
  name: string;
  date: string;
  time: string;
  venue: string;
  avenue: string;
  description: string;
  content: string;
  contact: string;
  featuredImage: string;
  images: string[];
}
const eventSchema: Schema = new Schema(
  {
    name: { type: String, require: true },
    date: { type: String, require: true },
    time: { type: String, require: true },
    venue: { type: String, require: true },
    avenue: { type: String, require: false },
    description: { type: String, require: true },
    content: { type: String, require: true },
    contact: { type: String, require: false },
    featuredImage: { type: String, require: false },
    images: [{ type: String }],
  },
  { timestamps: true },
);
export default mongoose.model<IEvent>("Events", eventSchema);
