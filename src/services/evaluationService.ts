/** @format */

import * as evaluationRepo from "../repos/evaluationRepo";
import { IEvaluation } from "../interfaces";
import { isValidObjectId } from "mongoose";

const createEvaluationService = async (evaluation: IEvaluation) => {
  try {
    const newEvaluation = await evaluationRepo.createEvaluationRepo(evaluation);
    return {
      message: "Evaluation created successfully",
      success: true,
      data: newEvaluation,
    };
  } catch (error) {
    return {
      message: "Failed to create evaluation",
      success: false,
      data: null,
    };
  }
};
const findEvaluationByIdService = async (id: string) => {
  try {
    if (!isValidObjectId(id)) {
      return {
        message: "Invalid evaluation ID",
        success: false,
        data: null,
      };
    }
    const evaluation = await evaluationRepo.findEvaluationByIdRepo(id);
    if (!evaluation) {
      return {
        message: "Evaluation not found",
        success: false,
        data: null,
      };
    }
    return {
      message: "Evaluation found",
      success: true,
      data: evaluation,
    };
  } catch (error) {
    return {
      message: "Error finding evaluation",
      success: false,
      data: null,
    };
  }
};
const findAllEvaluationsService = async () => {
  try {
    const evaluations = await evaluationRepo.findAllEvaluationsRepo();
    if (!evaluations) {
      return {
        message: "No evaluations found",
        success: false,
        data: null,
      };
    }
    return {
      message: "Evaluations found",
      success: true,
      data: evaluations,
    };
  } catch (error) {
    return {
      message: "Error finding evaluations",
      success: false,
      data: null,
    };
  }
};
const updateEvaluationByIdService = async (
  id: string,
  evaluation: IEvaluation,
) => {
  try {
    if (!isValidObjectId(id)) {
      return {
        message: "Invalid evaluation ID",
        success: false,
        data: null,
      };
    }
    const updatedEvaluation = await evaluationRepo.updateEvaluationByIdRepo(
      id,
      evaluation,
    );
    if (!updatedEvaluation) {
      return {
        message: "Evaluation not found",
        success: false,
        data: null,
      };
    }
    return {
      message: "Evaluation updated successfully",
      success: true,
      data: updatedEvaluation,
    };
  } catch (error) {
    return {
      message: "Error updating evaluation",
      success: false,
      data: null,
    };
  }
};
const deleteEvaluationByIdService = async (id: string) => {
  try {
    const deletedEvaluation = await evaluationRepo.deleteEvaluationByIdRepo(id);
    if (!deletedEvaluation) {
      return {
        message: "Evaluation not found",
        success: false,
        data: null,
      };
    }
    return {
      message: "Evaluation deleted successfully",
      success: true,
      data: deletedEvaluation,
    };
  } catch (error) {
    return {
      message: "Error deleting evaluation",
      success: false,
      data: null,
    };
  }
};

export {
  createEvaluationService,
  findEvaluationByIdService,
  findAllEvaluationsService,
  updateEvaluationByIdService,
  deleteEvaluationByIdService,
};
