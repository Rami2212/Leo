/** @format */
import mongoose, { Schema, Document } from "mongoose";
interface IBooking extends Document {
  userId: string;
  eventName: string;
  venue: string;
  date: string;
  time: string;
  avenue: string;
  status: string;
}
const bookingSchema: Schema = new Schema(
  {
    userId: { type: String, require: true },
    eventName: { type: String, require: true },
    venue: { type: String, require: true },
    date: { type: String, require: true },
    time: { type: String, require: true },
    avenue: { type: String, require: true },
    status: { type: String, require: true, default: "pending" },
  },
  { timestamps: true },
);
export default mongoose.model<IBooking>("Bookings", bookingSchema);
