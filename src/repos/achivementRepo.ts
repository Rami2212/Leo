/** @format */

import Achivemnets from "../models/achivementModels";
import { IAchivement } from "../interfaces/index";

const createAcnivementsRepo = async (achivement: IAchivement) => {
  try {
    const newAchivement = new Achivemnets(achivement);
    return await newAchivement.save();
  } catch (error) {
    throw new Error("Error creating achivement");
  }
};
const findAchivementByIdRepo = async (id: string) => {
  try {
    const achivement = await Achivemnets.find({ _id: id });
    if (achivement.length === 0) {
      return null;
    }
    return achivement;
  } catch (error) {
    throw new Error("Error finding achivement by id");
  }
};
const findAllAchivementsRepo = async () => {
  try {
    const achivements = await Achivemnets.find();
    if (achivements.length === 0) {
      return null;
    }
    return achivements;
  } catch (error) {
    throw new Error("Error finding all achivements");
  }
};
const deleteAchivementByIdRepo = async (id: string) => {
  try {
    const achivement = await Achivemnets.findByIdAndDelete(id);
    if (!achivement) {
      return null;
    }
    return achivement;
  } catch (error) {
    throw new Error("Error deleting achivement by id");
  }
};
const updateAchivementByIdRepo = async (
  id: string,
  achivement: IAchivement,
) => {
  try {
    const updatedAchivement = await Achivemnets.findByIdAndUpdate(
      id,
      achivement,
      { new: true },
    );
    if (!updatedAchivement) {
      return null;
    }
    return updatedAchivement;
  } catch (error) {
    throw new Error("Error updating achivement by id");
  }
};

export {
  createAcnivementsRepo,
  findAchivementByIdRepo,
  findAllAchivementsRepo,
  deleteAchivementByIdRepo,
  updateAchivementByIdRepo,
};
