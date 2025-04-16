/** @format */

import { Request, Response, NextFunction } from "express";

import {
  createEvaluationService,
  deleteEvaluationByIdService,
  findAllEvaluationsService,
  findEvaluationByIdService,
  updateEvaluationByIdService,
} from "../services/evaluationService";
import { isValidObjectId } from "mongoose";
import { IEvaluation } from "../interfaces/index";

const createEvaluationController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const evaluation = req.body as IEvaluation;
  console.log("Creating evaluation", evaluation);
  try {
    if (!evaluation) {
      res.status(400).json({ message: "Evaluation details are required" });
      return;
    }
    if (!evaluation.name || !evaluation.description) {
      res.status(400).json({ message: "Name and description are required" });
      return;
    }
    const savedEvaluation = await createEvaluationService(evaluation);
    if (savedEvaluation && savedEvaluation.success === false) {
      res.status(500).json({ message: savedEvaluation.message });
    } else {
      res.status(200).json({
        success: true,
        evaluation: savedEvaluation,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to save evaluation" });
    console.error("Error saving evaluation", error);
    return;
  }
};
const findEvaluationByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const evaluationId = req.params.id;
  if (!evaluationId) {
    res.status(400).json({ message: "Evaluation ID is required" });
    return;
  }
  try {
    if (!isValidObjectId(evaluationId)) {
      res.status(400).json({ message: "Invalid evaluation ID" });
      return;
    }
    const evaluation = await findEvaluationByIdService(evaluationId);
    if (evaluation && evaluation.success === false) {
      res.status(500).json({ message: evaluation.message });
    } else {
      res.status(200).json({
        success: true,
        evaluation: evaluation,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to find evaluation" });
    console.error("Error finding evaluation", error);
    return;
  }
};
const findAllEvaluationsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const evaluations = await findAllEvaluationsService();
    if (evaluations && evaluations.success === false) {
      res.status(500).json({ message: evaluations.message });
    } else {
      res.status(200).json({
        success: true,
        evaluations: evaluations,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to find evaluations" });
    console.error("Error finding evaluations", error);
    return;
  }
};
const updateEvaluationByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const evaluationId = req.params.id;
  const evaluation = req.body as IEvaluation;
  if (!evaluationId) {
    res.status(400).json({ message: "Evaluation ID is required" });
    return;
  }
  try {
    if (!isValidObjectId(evaluationId)) {
      res.status(400).json({ message: "Invalid evaluation ID" });
      return;
    }
    const updatedEvaluation = await updateEvaluationByIdService(
      evaluationId,
      evaluation,
    );
    if (updatedEvaluation && updatedEvaluation.success === false) {
      res.status(500).json({ message: updatedEvaluation.message });
    } else {
      res.status(200).json({
        success: true,
        evaluation: updatedEvaluation,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to update evaluation" });
    console.error("Error updating evaluation", error);
    return;
  }
};
const deleteEvaluationByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const evaluationId = req.params.id;
  if (!evaluationId) {
    res.status(400).json({ message: "Evaluation ID is required" });
    return;
  }
  try {
    if (!isValidObjectId(evaluationId)) {
      res.status(400).json({ message: "Invalid evaluation ID" });
      return;
    }
    const deletedEvaluation = await deleteEvaluationByIdService(evaluationId);
    if (deletedEvaluation && deletedEvaluation.success === false) {
      res.status(500).json({ message: deletedEvaluation.message });
    } else {
      res.status(200).json({
        success: true,
        evaluation: deletedEvaluation,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete evaluation" });
    console.error("Error deleting evaluation", error);
    return;
  }
};
export {
  createEvaluationController,
  findEvaluationByIdController,
  findAllEvaluationsController,
  updateEvaluationByIdController,
  deleteEvaluationByIdController,
};
