/** @format */

import { isValidObjectId } from "mongoose";
import { IAchivement } from "../interfaces";
import * as achivementRepo from "../repos/achivementRepo";

const createAchivementService = async (achivement: IAchivement) => {
  try {
    const newAchivement = await achivementRepo.createAcnivementsRepo(
      achivement,
    );
    return {
      message: "Achivement created successfully",
      success: true,
      data: newAchivement,
    };
  } catch (error) {
    return {
      message: "Failed to create achivement",
      success: false,
      data: null,
    };
  }
};
const findAchivementByIdService = async (id: string) => {
  try {
    if (!isValidObjectId(id)) {
      return {
        message: "Invalid achivement ID",
        success: false,
        data: null,
      };
    }
    const achivement = await achivementRepo.findAchivementByIdRepo(id);
    if (!achivement) {
      return {
        message: "Achivement not found",
        success: false,
        data: null,
      };
    }
    return {
      message: "Achivement found",
      success: true,
      data: achivement,
    };
  } catch (error) {
    return {
      message: "Error finding achivement",
      success: false,
      data: null,
    };
  }
};
const findAllAchivementsService = async () => {
  try {
    const achivements = await achivementRepo.findAllAchivementsRepo();
    if (!achivements) {
      return {
        message: "No achivements found",
        success: false,
        data: [],
      };
    }
    return {
      message: "Achivements found",
      success: true,
      data: achivements,
    };
  } catch (error) {
    return {
      message: "Error finding achivements",
      success: false,
      data: [],
    };
  }
};
const deleteAchivementByIdService = async (id: string) => {
  try {
    if (!isValidObjectId(id)) {
      return {
        message: "Invalid achivement ID",
        success: false,
        data: null,
      };
    }
    const achivement = await achivementRepo.deleteAchivementByIdRepo(id);
    if (!achivement) {
      return {
        message: "Achivement not found",
        success: false,
        data: null,
      };
    }
    return {
      message: "Achivement deleted successfully",
      success: true,
      data: achivement,
    };
  } catch (error) {
    return {
      message: "Error deleting achivement",
      success: false,
      data: null,
    };
  }
};
const updateAchivementByIdService = async (
  id: string,
  achivement: IAchivement,
) => {
  try {
    if (!isValidObjectId(id)) {
      return {
        message: "Invalid achivement ID",
        success: false,
        data: null,
      };
    }
    const updatedAchivement = await achivementRepo.updateAchivementByIdRepo(
      id,
      achivement,
    );
    if (!updatedAchivement) {
      return {
        message: "Achivement not found",
        success: false,
        data: null,
      };
    }
    return {
      message: "Achivement updated successfully",
      success: true,
      data: updatedAchivement,
    };
  } catch (error) {
    return {
      message: "Error updating achivement",
      success: false,
      data: null,
    };
  }
};
export {
  createAchivementService,
  findAchivementByIdService,
  findAllAchivementsService,
  deleteAchivementByIdService,
  updateAchivementByIdService,
};
