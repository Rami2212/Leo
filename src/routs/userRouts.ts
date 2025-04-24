/** @format */
import express from "express";
import * as userController from "../controllers/userController";
const router = express.Router();

router.post("/login", userController.userLogin);
router.post("/create", userController.createUser);
router.get("/", userController.findAllUsers);
router.get("/student/:id", userController.findUserByStudentId);
router.get("/:id", userController.findUserById);
router.put("/:id", userController.updateUserbyID);
router.delete("/:id", userController.deleteUserById);
router.post("/otp/:id", userController.getUserByOtp);
router.put("/changePw/:id", userController.changeUserPasswordByIdController);

export default router;
