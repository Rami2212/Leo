/** @format */

import express from "express";
import * as achivementController from "../controllers/achivementController";
const router = express.Router();

router.post("/save", achivementController.createAchivementController);
router.get("/:id", achivementController.findAchivementByIdController);
router.get("/", achivementController.findAllAchivementsController);
router.put("/:id", achivementController.updateAchivementByIdController);
router.delete("/:id", achivementController.deleteAchivementByIdController);

export default router;
