/** @format */

import { Request, Response, NextFunction } from "express";
import {
  createBookingService,
  deleteBookingByIdService,
  findAllBookingsService,
  findBookingByIdService,
  updateBookingStatusByIdService,
} from "../services/bookingServices";
import { IBooking } from "../interfaces";

const createBookingController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const booking = req.body as IBooking;
  console.log("Creating booking", booking);
  try {
    if (!booking) {
      res.status(400).json({ message: "Booking details are required" });
      return;
    }
    if (!booking.userId || !booking.eventName) {
      res.status(400).json({ message: "User ID and event name are required" });
      return;
    }
    const savedBooking = await createBookingService(booking);
    if (savedBooking && savedBooking.success === false) {
      res.status(500).json({ message: savedBooking.message });
    } else {
      res.status(200).json({
        success: true,
        booking: savedBooking,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to save booking" });
    console.error("Error saving booking", error);
    return;
  }
};
const findBookingByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const bookingId = req.params.id;
  if (!bookingId) {
    res.status(400).json({ message: "Booking ID is required" });
    return;
  }
  try {
    const booking = await findBookingByIdService(bookingId);
    if (booking && booking.success === false) {
      res.status(500).json({ message: booking.message });
    } else {
      res.status(200).json({
        success: true,
        booking: booking,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to get booking" });
    console.error("Error getting booking", error);
    return;
  }
};
const findAllBookingsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const bookings = await findAllBookingsService();
    if (bookings && bookings.success === false) {
      res.status(500).json({ message: bookings.message });
    } else {
      res.status(200).json({
        success: true,
        bookings: bookings,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to get bookings" });
    console.error("Error getting bookings", error);
    return;
  }
};
const updateBookingStatusByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const bookingId = req.params.id;
  const status = req.params.status;
  if (!bookingId) {
    res.status(400).json({ message: "Booking ID is required" });
    return;
  }
  try {
    const updatedBooking = await updateBookingStatusByIdService(
      bookingId,
      status,
    );
    if (updatedBooking && updatedBooking.success === false) {
      res.status(500).json({ message: updatedBooking.message });
    } else {
      res.status(200).json({
        success: true,
        booking: updatedBooking,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to update booking" });
    console.error("Error updating booking", error);
    return;
  }
};
const deleteBookingByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const bookingId = req.params.id;
  if (!bookingId) {
    res.status(400).json({ message: "Booking ID is required" });
    return;
  }
  try {
    const deletedBooking = await deleteBookingByIdService(bookingId);
    if (deletedBooking && deletedBooking.success === false) {
      res.status(500).json({ message: deletedBooking.message });
    } else {
      res.status(200).json({
        success: true,
        booking: deletedBooking,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete booking" });
    console.error("Error deleting booking", error);
    return;
  }
};
export {
  createBookingController,
  findBookingByIdController,
  findAllBookingsController,
  updateBookingStatusByIdController,
  deleteBookingByIdController,
};
