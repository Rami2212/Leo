/** @format */

import express from "express";
import * as eventController from "../controllers/eventController";
const router = express.Router();

router.post("/save", eventController.createEventController);
router.get("/:id", eventController.findEventByIdController);
router.get("/", eventController.findAllEventsController);
router.get("/date/:date", eventController.findEventByDateController);
router.put("/:id", eventController.updateEventController);
router.delete("/:id", eventController.deleteEventController);

export default router;
