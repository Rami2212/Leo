/** @format */

import User from "../models/userModels";
import { IUser } from "../interfaces/index";

const createUserRepo = async (user: IUser) => {
  try {
    const newUser = new User(user);
    return await newUser.save();
  } catch (error) {
    throw new Error("Error creating user");
  }
};
const findUserByEmailRepo = async (email: string) => {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (error) {
    throw new Error("Error finding user by email");
  }
};
const findUserByStudentIdRepo = async (studentId: string) => {
  try {
    const user = await User.findOne({ studentId });
    return user;
  } catch (error) {
    throw new Error("Error finding user by studentId");
  }
};
const findUserByIdRepo = async (id: string) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      return null;
    }
    return user;
  } catch (error) {
    throw new Error("Error finding user by id");
  }
};
const findAllUsersRepo = async () => {
  try {
    const users = await User.find();
    if (users.length === 0) {
      return null;
    }
    return users;
  } catch (error) {
    throw new Error("Error finding all users");
  }
};
const updateUserByIdRepo = async (id: string, user: IUser) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(id, user, { new: true });
    if (!updatedUser) {
      return null;
    }
    return updatedUser;
  } catch (error) {
    throw new Error("Error updating user by id");
  }
};
const deleteUserByIdRepo = async (id: string) => {
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return null;
    }
    return user;
  } catch (error) {
    throw new Error("Error deleting user by id");
  }
};
const findByUserIdFromUserRoleRepo = async (role: string) => {
  try {
    const users = await User.find({ role });
    if (users.length === 0) {
      return null;
    }
    return users.map((user) => user._id);
  } catch (error) {
    throw new Error("Error finding user by role");
  }
};
const findAllUserIdRepo = async () => {
  try {
    const users = await User.find();
    if (users.length === 0) {
      return null;
    }
    return users.map((user) => user._id);
  } catch {
    throw new Error("Error finding all user ids");
  }
};

export {
  createUserRepo,
  findUserByEmailRepo,
  findUserByStudentIdRepo,
  updateUserByIdRepo,
  findAllUsersRepo,
  deleteUserByIdRepo,
  findUserByIdRepo,
  findByUserIdFromUserRoleRepo,
  findAllUserIdRepo,
};
