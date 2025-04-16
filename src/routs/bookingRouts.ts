/** @format */

import express from "express";
import * as bookingController from "../controllers/bookingController";
const router = express.Router();

router.post("/save", bookingController.createBookingController);
router.get("/:id", bookingController.findBookingByIdController);
router.get("/", bookingController.findAllBookingsController);
router.put("/:id/:status", bookingController.updateBookingStatusByIdController);
router.delete("/:id", bookingController.deleteBookingByIdController);

export default router;
