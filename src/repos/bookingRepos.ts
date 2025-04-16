/** @format */

import Bokkings from "../models/bookingsModels";
import { IBooking } from "../interfaces/index";

const createBookingRepo = async (booking: IBooking) => {
  try {
    const newBooking = new Bokkings(booking);
    return await newBooking.save();
  } catch (error) {
    throw new Error("Error creating booking");
  }
};
const findBookingByIdRepo = async (id: string) => {
  try {
    const booking = await Bokkings.find({ _id: id });
    if (booking.length === 0) {
      return null;
    }
    return booking;
  } catch (error) {
    throw new Error("Error finding booking by id");
  }
};
const findAllBookingsRepo = async () => {
  try {
    const bookings = await Bokkings.find();
    if (bookings.length === 0) {
      return null;
    }
    return bookings;
  } catch (error) {
    throw new Error("Error finding all bookings");
  }
};
const updateBookingStatusByIdRepo = async (id: string, status: string) => {
  try {
    const updatedBooking = await Bokkings.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    );
    if (!updatedBooking) {
      return null;
    }
    return updatedBooking;
  } catch (error) {
    throw new Error("Error updating booking status by id");
  }
};
const deleteBookingByIdRepo = async (id: string) => {
  try {
    const booking = await Bokkings.findByIdAndDelete(id);
    if (!booking) {
      return null;
    }
    return booking;
  } catch (error) {
    throw new Error("Error deleting booking by id");
  }
};

export {
  createBookingRepo,
  findBookingByIdRepo,
  findAllBookingsRepo,
  updateBookingStatusByIdRepo,
  deleteBookingByIdRepo,
};
