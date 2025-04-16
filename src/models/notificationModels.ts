/** @format */
import mongoose, { Schema, Document } from "mongoose";
interface INotification extends Document {
  title: string;
  description: string;
  date: string;
  time: string;
  createdByUserId: string;
  vissibleToUserIds: string[];
  relatedEventId?: string;
}

const notificationSchema: Schema = new Schema({
  title: { type: String, require: true },
  description: { type: String, require: true },
  date: { type: String, require: true },
  time: { type: String, require: true },
  createdByUserId: { type: String, require: true },
  vissibleToUserIds: { type: [String], require: true },
  relatedEventId: { type: String, require: false },
});
export default mongoose.model<INotification>(
  "Notifications",
  notificationSchema,
);
