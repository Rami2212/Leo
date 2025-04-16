/** @format */

import e, { Request, Response, NextFunction } from "express";
import {
  createAchivementService,
  deleteAchivementByIdService,
  findAllAchivementsService,
  findAchivementByIdService,
  updateAchivementByIdService,
} from "../services/achivementService";
import { IAchivement } from "../interfaces";
import { isValidObjectId } from "mongoose";


const createAchivementController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const achivement = req.body as IAchivement;
  try {
    if (!achivement) {
      res.status(400).json({ message: "Achivement details are required" });
      return;
    }
    if (!achivement.name || !achivement.description) {
      res
        .status(400)
        .json({ message: "Achivement name and description are required" });
      return;
    }
    const savedAchivement = await createAchivementService(achivement);
    if (savedAchivement && savedAchivement.success === false) {
      res.status(500).json({ message: savedAchivement.message });
    } else {
      res.status(200).json({
        success: true,
        achivement: savedAchivement,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to save achivement" });
    console.error("Error saving achivement", error);
    return;
  }
};
const findAchivementByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const achivementId = req.params.id;
  //validate achivementId as mongo db ID
  if (!isValidObjectId(achivementId)) {
    res.status(400).json({ message: "Invalid achivement ID" });
    return;
  }
  try {
    if (!achivementId) {
      res.status(400).json({ message: "Achivement ID is required" });
      return;
    }
    const achivement = await findAchivementByIdService(achivementId);
    if (achivement && achivement.success === false) {
      res.status(500).json({ message: achivement.message });
    } else {
      res.status(200).json({ success: true, achivement });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to get achivement" });
    console.error("Error getting achivement", error);
    return;
  }
};
const findAllAchivementsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const achivements = await findAllAchivementsService();
    if (achivements && achivements.success === false) {
      res.status(500).json({ message: achivements.message });
    } else {
      res.status(200).json({ success: true, achivements });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to get achivements" });
    console.error("Error getting achivements", error);
    return;
  }
};
const updateAchivementByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const achivementId = req.params.id;
  const achivement = req.body as IAchivement;
  try {
    if (!achivementId) {
      res.status(400).json({ message: "Achivement ID is required" });
      return;
    }
    if (!achivement) {
      res.status(400).json({ message: "Achivement details are required" });
      return;
    }
    if (!achivement.name || !achivement.description) {
      res
        .status(400)
        .json({ message: "Achivement name and description are required" });
      return;
    }
    const updatedAchivement = await updateAchivementByIdService(
      achivementId,
      achivement,
    );
    if (updatedAchivement && updatedAchivement.success === false) {
      res.status(500).json({ message: updatedAchivement.message });
    } else {
      res.status(200).json({
        success: true,
        achivement: updatedAchivement,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to update achivement" });
    console.error("Error updating achivement", error);
    return;
  }
};
const deleteAchivementByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const achivementId = req.params.id;
  try {
    if (!achivementId) {
      res.status(400).json({ message: "Achivement ID is required" });
      return;
    }
    const deletedAchivement = await deleteAchivementByIdService(achivementId);
    if (deletedAchivement && deletedAchivement.success === false) {
      res.status(500).json({ message: deletedAchivement.message });
    } else {
      res.status(200).json({
        success: true,
        achivement: deletedAchivement,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete achivement" });
    console.error("Error deleting achivement", error);
    return;
  }
};
export {
  createAchivementController,
  findAchivementByIdController,
  findAllAchivementsController,
  updateAchivementByIdController,
  deleteAchivementByIdController,
};
