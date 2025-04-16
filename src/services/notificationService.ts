/** @format */

import { isValidObjectId } from "mongoose";
import { INotification } from "../interfaces";
import * as notificationRepo from "../repos/notificatioRepo";
import * as userRepo from "../repos/userRepo";

const createNotificationService = async (notification: INotification) => {
  try {
    const vissbileUsersId = await userRepo.findAllUserIdRepo();
    const newNotification = await notificationRepo.createNotificationRepo({
      ...notification,
      vissibleToUserIds: vissbileUsersId as Object[],
    });
    return {
      message: "Notification created successfully",
      success: true,
      data: newNotification,
    };
  } catch (error) {
    return {
      message: "Failed to create notification",
      success: false,
      data: null,
    };
  }
};
const findNotificationByViewerIdService = async (userId: string) => {
  try {
    if (!isValidObjectId(userId)) {
      return {
        message: "Invalid user id",
        success: false,
        data: [],
      };
    }
    const notifications = await notificationRepo.findNotificationByViewerIdRepo(
      userId,
    );
    if (!notifications) {
      return {
        message: "No notifications found",
        success: false,
        data: [],
      };
    }
    return {
      message: "Notifications found",
      success: true,
      data: notifications,
    };
  } catch (error) {
    return {
      message: "Error finding notifications",
      success: false,
      data: [],
    };
  }
};
const deleteNotificationService = async (id: string) => {
  try {
    if (!isValidObjectId(id)) {
      return {
        message: "Invalid notification id",
        success: false,
        data: [],
      };
    }
    const notification = await notificationRepo.deleteNotificationRepo(id);
    if (!notification) {
      return {
        message: "Notification not found",
        success: false,
        data: [],
      };
    }
    return {
      message: "Notification deleted successfully",
      success: true,
      data: notification,
    };
  } catch (error) {
    return {
      message: "Error deleting notification",
      success: false,
      data: [],
    };
  }
};
export {
  createNotificationService,
  findNotificationByViewerIdService,
  deleteNotificationService,
};
