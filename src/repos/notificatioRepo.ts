/** @format */

import Notification from "../models/notificationModels";
import { INotification } from "../interfaces/index";

const createNotificationRepo = async (notification: INotification) => {
  try {
    const newNotification = new Notification(notification);
    await newNotification.save();
  } catch (error) {
    throw new Error("Error creating notification");
  }
};
const findNotificationByViewerIdRepo = async (userId: string) => {
  try {
    const notifications = await Notification.find({
      vissibleToUserIds: userId,
    });
    if (notifications.length === 0) {
      return null;
    }
    return notifications;
  } catch (error) {
    throw new Error("Error finding notification by viewer id");
  }
};
const deleteNotificationRepo = async (id: string) => {
  try {
    const notification = await Notification.findByIdAndDelete(id);
    if (!notification) {
      return null;
    }
    return notification;
  } catch (error) {
    throw new Error("Error deleting notification");
  }
};

export {
  createNotificationRepo,
  findNotificationByViewerIdRepo,
  deleteNotificationRepo,
};
