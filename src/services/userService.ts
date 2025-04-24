/** @format */
import { IUser } from "../interfaces";
import bcrypt from "bcrypt";
import { findUserByEmailRepo } from "../repos/userRepo";
import User from "../models/userModels";
import * as userRepo from "../repos/userRepo";
import Jwt from "jsonwebtoken";
import dotenv from "dotenv";
import sendEmail from "./emailService";

dotenv.config();
const jwtSecret = process.env.JWT_SECRET as string;
const soltRounds = 10;

const loginService = async (email: string, password: string) => {
  try {
    const user = await findUserByEmailRepo(email);

    if (!user) {
      console.warn(`User not found with email: ${email}`);
      return {
        message: "User not found",
        success: false,
      };
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (isPasswordMatch) {
      const token = Jwt.sign(
        { email: user.email, role: user.role },
        jwtSecret.toString(),
        { expiresIn: "24h" },
      );
      await sendEmail(
        email,
        "Login Notification",
        "You have successfully logged in to your account",
      );
      return {
        message: "Login successful",
        success: true,
        data: {
          userID: user._id,
          email: user.email,
          role: user.role,
          name: user.name,
          token,
        },
      };
    } else {
      await sendEmail(
        email,
        "Login Attempt",
        "Someone attempted to log in to your account with an invalid email.",
      );
      return {
        message: "Invalid password",
        success: false,
      };
    }
  } catch (error) {
    console.error("Error in loginService", error);
    return {
      message: "Failed to login",
      success: false,
    };
  }
};

const createUserService = async (userDetail: IUser) => {
  const hashPassword = await bcrypt.hash(userDetail.password, soltRounds);
  try {
    let existingUser;
    existingUser = await findUserByEmailRepo(userDetail.email);
    existingUser = await userRepo.findUserByStudentIdRepo(userDetail.studentId);
    if (existingUser) {
      console.warn(`User Already Exists ${userDetail.email} `);
      return {
        message: "User Already Exists",
        success: false,
        data: {
          email: userDetail.email,
          role: userDetail.role,
          name: userDetail.name,
        },
      };
    }
    const token = Jwt.sign(
      { email: userDetail.email, role: userDetail.role },
      jwtSecret.toString(),
      { expiresIn: "24h" },
    );
    const user = new User({
      ...userDetail,
      password: hashPassword,
    });
    const createdUser = await userRepo.createUserRepo(user);

    const otp = Math.floor(100000 + Math.random() * 900000);
    await sendEmail(
      userDetail.email,
      "Account Created",
      `Your account has been created successfully. Your OTP is ${otp}`,
    );
    return {
      message: "User Created Successfully",
      success: true,
      data: {
        userID: createdUser._id,
        email: userDetail.email,
        role: userDetail.role,
        name: userDetail.name,
        otp,
        token,
      },
    };
  } catch (error) {
    return { success: "false", message: "Failed to add user" };
  }
};
const findUserByStudentIdService = async (studentId: string) => {
  try {
    const user = await userRepo.findUserByStudentIdRepo(studentId);
    if (!user) {
      return {
        message: "User not found",
        success: false,
      };
    }
    return {
      message: "User found",
      success: true,
      data: user,
    };
  } catch (error) {
    console.error("Error in findUserByStudentIdService", error);
    return {
      message: "Failed to find user",
      success: false,
    };
  }
};
const findAllUsersService = async () => {
  try {
    const users = await userRepo.findAllUsersRepo();
    if (!users) {
      return {
        message: "No users found",
        success: false,
      };
    }
    return {
      message: "Users found",
      success: true,
      data: users,
    };
  } catch (error) {
    console.error("Error in findAllUsersService", error);
    return {
      message: "Failed to find users",
      success: false,
    };
  }
};
const updateUserByIdService = async (id: string, user: IUser) => {
  try {
    const updatedUser = await userRepo.updateUserByIdRepo(id, user);
    if (!updatedUser) {
      return {
        message: "User not found",
        success: false,
      };
    }
    return {
      message: "User updated successfully",
      success: true,
      data: updatedUser,
    };
  } catch (error) {
    console.error("Error in updateUserByIdService", error);
    return {
      message: "Failed to update user",
      success: false,
    };
  }
};
const resetUserPasswordByIdService = async (
  userID: string,
  newPassWord: string,
) => {
  const hashPassword = await bcrypt.hash(newPassWord, soltRounds);
  try {
    const user = await userRepo.findUserByIdRepo(userID);
    if (!user) {
      return {
        message: "User not found",
        success: false,
      };
    }
    const updatedUser = await userRepo.updateUserByIdRepo(userID, {
      password: hashPassword,
    } as IUser);
    if (!updatedUser) {
      return {
        message: "Failed to update password",
        success: false,
      };
    }
    await sendEmail(
      user.email,
      "Password Reset",
      "Your password has been reset successfully",
    );
    return {
      message: "Password updated successfully",
      success: true,
      data: updatedUser,
    };
  } catch (error) {
    console.error("Error in resetUserPasswordByIdService", error);
    return {
      message: "Failed to reset password",
      success: false,
    };
  }
};
const deleteUserByIdService = async (id: string) => {
  try {
    const deletedUser = await userRepo.deleteUserByIdRepo(id);
    if (!deletedUser) {
      return {
        message: "User not found",
        success: false,
      };
    }
    return {
      message: "User deleted successfully",
      success: true,
      data: deletedUser,
    };
  } catch (error) {
    console.error("Error in deleteUserByIdService", error);
    return {
      message: "Failed to delete user",
      success: false,
    };
  }
};
const findByUserIDService = async (userID: string) => {
  try {
    const user = await userRepo.findUserByIdRepo(userID);
    if (!user) {
      return { message: "User not found", success: false };
    }
    return { message: "User found", success: true, data: user };
  } catch (error) {
    return { message: "Failed to find user", success: false };
  }
};
export {
  loginService,
  createUserService,
  findUserByStudentIdService,
  findAllUsersService,
  updateUserByIdService,
  deleteUserByIdService,
  findByUserIDService,
  resetUserPasswordByIdService,
};
