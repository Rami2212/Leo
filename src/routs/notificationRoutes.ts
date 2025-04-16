/** @format */

import express from "express";
import * as notificationController from "../controllers/notificationController";
const router = express.Router();

router.post("/save", notificationController.createNotificationController);
router.get("/:id", notificationController.findNotificationByViewerIdController);
router.delete("/:id", notificationController.deleteNotificationController);

export default router;
