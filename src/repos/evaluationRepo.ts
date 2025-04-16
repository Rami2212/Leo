/** @format */

import Evaluation from "../models/evaluationModels";
import { IEvaluation } from "../interfaces/index";
import * as evaluationRepo from "../repos/evaluationRepo";

const createEvaluationRepo = async (evaluation: IEvaluation) => {
  try {
    const newEvaluation = new Evaluation(evaluation);
    return await newEvaluation.save();
  } catch (error) {
    throw new Error("Error creating evaluation");
  }
};
const findEvaluationByIdRepo = async (id: string) => {
  try {
    const evaluation = await Evaluation.findById(id);
    if (!evaluation) {
      return null;
    }
    return evaluation;
  } catch (error) {
    throw new Error("Error finding evaluation by id");
  }
};
const findAllEvaluationsRepo = async () => {
  try {
    const evaluations = await Evaluation.find();
    if (evaluations.length === 0) {
      return null;
    }
    return evaluations;
  } catch (error) {
    throw new Error("Error finding all evaluations");
  }
};
const updateEvaluationByIdRepo = async (
  id: string,
  evaluation: IEvaluation,
) => {
  try {
    const updatedEvaluation = await Evaluation.findByIdAndUpdate(
      id,
      evaluation,
      { new: true },
    );
    if (!updatedEvaluation) {
      return null;
    }
    return updatedEvaluation;
  } catch (error) {
    throw new Error("Error updating evaluation by id");
  }
};
const deleteEvaluationByIdRepo = async (id: string) => {
  try {
    const deletedEvaluation = await Evaluation.findByIdAndDelete(id);
    if (!deletedEvaluation) {
      return null;
    }
    return deletedEvaluation;
  } catch (error) {
    throw new Error("Error deleting evaluation by id");
  }
};
export {
  createEvaluationRepo,
  findEvaluationByIdRepo,
  findAllEvaluationsRepo,
  updateEvaluationByIdRepo,
  deleteEvaluationByIdRepo,
};
