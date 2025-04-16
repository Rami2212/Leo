/** @format */

import express from "express";
import * as evaluationController from "../controllers/evaluationController";
const router = express.Router();

router.post("/save", evaluationController.createEvaluationController);
router.get("/:id", evaluationController.findEvaluationByIdController);
router.get("/", evaluationController.findAllEvaluationsController);
router.put("/:id", evaluationController.updateEvaluationByIdController);
router.delete("/:id", evaluationController.deleteEvaluationByIdController);

export default router;
