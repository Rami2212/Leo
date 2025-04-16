/** @format */

import { Request, Response, NextFunction } from "express";
import {
  createNotificationService,
  deleteNotificationService,
  findNotificationByViewerIdService,
} from "../services/notificationService";
import { INotification } from "../interfaces";

const createNotificationController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const notification = req.body as INotification;
  try {
    if (!notification) {
      res.status(400).json({ message: "Notification details are required" });
      return;
    }
    if (!notification.title || !notification.description) {
      res.status(400).json({
        message: "Notification title and description are required",
      });
      return;
    }
    const savedNotification = await createNotificationService(notification);
    if (savedNotification && savedNotification.success === false) {
      res.status(500).json({ message: savedNotification.message });
    } else {
      res.status(200).json({ success: true, notification: savedNotification });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to save notification" });
    console.error("Error saving notification", error);
    return;
  }
};
const findNotificationByViewerIdController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.params.id;
  try {
    if (!userId) {
      res.status(400).json({ message: "User ID is required" });
      return;
    }
    const notifications = await findNotificationByViewerIdService(userId);
    if (notifications && notifications.success === false) {
      res.status(500).json({ message: notifications.message });
    } else {
      res.status(200).json({ success: true, notifications });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to get notifications" });
    console.error("Error getting notifications", error);
    return;
  }
};
const deleteNotificationController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const notificationId = req.params.id;
  try {
    if (!notificationId) {
      res.status(400).json({ message: "Notification ID is required" });
      return;
    }
    const deletedNotification = await deleteNotificationService(notificationId);
    if (deletedNotification && deletedNotification.success === false) {
      res.status(500).json({ message: deletedNotification.message });
    } else {
      res
        .status(200)
        .json({ success: true, notification: deletedNotification });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete notification" });
    console.error("Error deleting notification", error);
    return;
  }
};
export {
  createNotificationController,
  findNotificationByViewerIdController,
  deleteNotificationController,
};
