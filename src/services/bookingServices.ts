/** @format */

import { isValidObjectId } from "mongoose";
import { IBooking } from "../interfaces";
import * as bookingRepo from "../repos/bookingRepos";
import * as notificationRepo from "../repos/notificatioRepo";
import * as userRepo from "../repos/userRepo";
import { INotification } from "../interfaces/index";

const createBookingService = async (booking: IBooking) => {
  try {
    const newBooking = await bookingRepo.createBookingRepo(booking);
    const vissbileUsersId = await userRepo.findByUserIdFromUserRoleRepo(
      "Admin",
    );
    console.log("Vissible to user IDs", vissbileUsersId);
    const notification: INotification = {
      title: "Booking Created",
      description: `Booking for ${booking.eventName} has been created successfully.`,
      date: booking.date,
      time: booking.time,
      createdByUserId: booking.userId,
      vissibleToUserIds:
        vissbileUsersId && vissbileUsersId.length > 0
          ? (vissbileUsersId as object[])
          : [],
      relatedEventId: newBooking.id,
    };
    await notificationRepo.createNotificationRepo(notification);
    console.log("Notification created successfully", notification);
    return {
      message: "Booking created successfully",
      success: true,
      data: newBooking,
    };
  } catch (error) {
    return {
      message: "Failed to create booking",
      success: false,
      data: null,
    };
  }
};
const findBookingByIdService = async (id: string) => {
  try {
    if (!isValidObjectId(id)) {
      return {
        message: "Invalid booking ID",
        success: false,
        data: null,
      };
    }
    const booking = await bookingRepo.findBookingByIdRepo(id);
    if (!booking) {
      return {
        message: "Booking not found",
        success: false,
        data: null,
      };
    }
    return {
      message: "Booking found",
      success: true,
      data: booking,
    };
  } catch (error) {
    return {
      message: "Error finding booking",
      success: false,
      data: null,
    };
  }
};
const findAllBookingsService = async () => {
  try {
    const bookings = await bookingRepo.findAllBookingsRepo();
    if (!bookings) {
      return {
        message: "No bookings found",
        success: false,
        data: null,
      };
    }
    return {
      message: "Bookings found",
      success: true,
      data: bookings,
    };
  } catch (error) {
    return {
      message: "Error finding bookings",
      success: false,
      data: null,
    };
  }
};
const updateBookingStatusByIdService = async (id: string, status: string) => {
  try {
    if (!isValidObjectId(id)) {
      return {
        message: "Invalid booking ID",
        success: false,
        data: null,
      };
    }
    const updatedBooking = await bookingRepo.updateBookingStatusByIdRepo(
      id,
      status,
    );

    if (!updatedBooking) {
      return {
        message: "Booking not found",
        success: false,
        data: null,
      };
    }
    if (!updatedBooking) {
      return {
        message: "Booking not found",
        success: false,
        data: null,
      };
    }
    const notification: INotification = {
      title: "Booking Status Updated",
      description: `Booking status has been updated to ${status}.`,
      date: updatedBooking.date || "",
      time: updatedBooking.time || "",
      createdByUserId: "",
      vissibleToUserIds: [updatedBooking.userId as unknown as object],
      relatedEventId: id,
    };
    await notificationRepo.createNotificationRepo(notification);
    console.log("Notification created successfully", notification);

    return {
      message: "Booking updated successfully",
      success: true,
      data: updatedBooking,
    };
  } catch (error) {
    return {
      message: "Error updating booking",
      success: false,
      data: null,
    };
  }
};
const deleteBookingByIdService = async (id: string) => {
  try {
    if (!isValidObjectId(id)) {
      return {
        message: "Invalid booking ID",
        success: false,
        data: null,
      };
    }
    const deletedBooking = await bookingRepo.deleteBookingByIdRepo(id);
    if (!deletedBooking) {
      return {
        message: "Booking not found",
        success: false,
        data: null,
      };
    }
    return {
      message: "Booking deleted successfully",
      success: true,
      data: deletedBooking,
    };
  } catch (error) {
    return {
      message: "Error deleting booking",
      success: false,
      data: null,
    };
  }
};
export {
  createBookingService,
  findBookingByIdService,
  findAllBookingsService,
  updateBookingStatusByIdService,
  deleteBookingByIdService,
};
