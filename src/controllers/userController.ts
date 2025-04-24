/** @format */

import { Request, Response, NextFunction } from "express";
import {
  createUserService,
  deleteUserByIdService,
  findAllUsersService,
  findByUserIDService,
  findUserByStudentIdService,
  loginService,
  resetUserPasswordByIdService,
  updateUserByIdService,
} from "../services/userService";
import { responseDTO } from "../DTO/response";
import { isValidObjectId } from "mongoose";
import sendEmail from "../services/emailService";

const userLogin = async (req: Request, res: Response, next: NextFunction) => {
  const credentials = req.body;
  let user;
  try {
    if (!credentials) {
      res.status(400).json({ message: "User details are required" });
      return;
    }
    if (!credentials.email || !credentials.password) {
      res.status(400).json({ message: "Email and password are required" });
      return;
    }
    user = await loginService(credentials.email, credentials.password);
    if (user && user.success === false) {
      res.status(500).json(responseDTO("false", [], user.message));
    } else {
      res
        .status(200)
        .json(responseDTO(user.success.toString(), user, user.message));
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to login" });
    console.error("Error logging in user", error);
    return;
  }
};
const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const credentials = req.body;
  let user;
  console.log("Creating user", credentials);
  try {
    if (!credentials) {
      res.status(400).json({ message: "User details are required" });
      return;
    }
    if (!credentials.email || !credentials.password || !credentials.role) {
      res.status(400).json({ message: "Email and password are required" });
      return;
    }
    user = await createUserService(credentials);
    if (user && user.success === "false") {
      res.status(500).json(responseDTO("false", [], user.message));
    }
    res
      .status(200)
      .json(responseDTO(user.success.toString(), user, user.message));
  } catch (error) {
    res.status(500).json({ message: "Failed to add user" });
    console.error("Error creating user", error);
    return;
  }
};
const findUserById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.params.id as string;
  if (!userId) {
    res.status(400).json({ message: "User ID is required" });
    return;
  }
  if (!isValidObjectId(userId)) {
    res.status(400).json({ message: "Invalid User ID" });
    return;
  }
  try {
    const user = await findByUserIDService(userId);
    if (user && user.success === false) {
      res.status(500).json({ message: user.message });
    } else {
      res.status(200).json({
        success: true,
        user: user,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to get user" });
    console.error("Error getting user", error);
    return;
  }
};
const findAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const users = await findAllUsersService();
    if (users && users.success === false) {
      res.status(500).json({ message: users.message });
    } else {
      res.status(200).json({
        success: true,
        user: users,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to get user" });
    console.error("Error getting user", error);
    return;
  }
};
const findUserByStudentId = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const studentId = req.params.id as string;
  if (!studentId) {
    res.status(400).json({ message: "Student ID is required" });
    return;
  }
  try {
    const user = await findUserByStudentIdService(studentId);
    if (user && user.success === false) {
      res.status(500).json({ message: user.message });
    } else {
      res.status(200).json({
        success: true,
        user: user,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to get user" });
    console.error("Error getting user", error);
    return;
  }
};
const updateUserbyID = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.params.id as string;
  const user = req.body;
  if (!userId || !user) {
    res.status(400).json({ message: "User ID and details are required" });
    return;
  }
  try {
    const updatedUser = await updateUserByIdService(userId, user);
    if (updatedUser && updatedUser.success === false) {
      res.status(500).json({ message: updatedUser.message });
    } else {
      res.status(200).json({
        success: true,
        user: updatedUser,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to update user" });
    console.error("Error updating user", error);
    return;
  }
};
const deleteUserById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.params.id as string;
  if (!userId) {
    res.status(400).json({ message: "User ID is required" });
    return;
  }
  try {
    const deletedUser = await deleteUserByIdService(userId);
    if (deletedUser && deletedUser.success === false) {
      res.status(500).json({ message: deletedUser.message });
    } else {
      res.status(200).json({
        success: true,
        user: deletedUser,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete user" });
    console.error("Error deleting user", error);
    return;
  }
};

const changeUserPasswordByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.params.id as string;
  const password = req.body.password;
  if (!userId || !password) {
    res.status(400).json({ message: "User ID and password are required" });
    return;
  }
  try {
    const updatedUser = await resetUserPasswordByIdService(userId, password);
    if (updatedUser && updatedUser.success === false) {
      res.status(500).json({ message: updatedUser.message });
    } else {
      res.status(200).json({
        success: true,
        user: updatedUser,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to change password" });
    console.error("Error changing user password", error);
    return;
  }
};
const getUserByOtp = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.params.id as string;
  const userEmail = req.body.email as string;
  if (!userId || !userEmail) {
    res.status(400).json({ message: "User ID and email are required" });
    return;
  }
  try {
    const user = await findByUserIDService(userId);
    if (user && user.success === false) {
      res.status(500).json({ message: user.message });
    } else {
      const otp = Math.floor(100000 + Math.random() * 900000);
      const sendMail = await sendEmail(
        userEmail,
        "Password Change Request",
        `Your OTP for password change is ${otp}`,
      );
      res.status(200).json({
        success: true,
        message: "OTP sent successfully",
        data: { otp },
      });
      return;
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to send OTP" });
    console.error("Error sending OTP", error);
    return;
  }
};

export {
  userLogin,
  createUser,
  findUserById,
  findAllUsers,
  findUserByStudentId,
  updateUserbyID,
  deleteUserById,
  changeUserPasswordByIdController,
  getUserByOtp,
};
