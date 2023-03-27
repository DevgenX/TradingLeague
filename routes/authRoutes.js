import express from "express";
const router = express.Router();

import {
  getAllUsers,
  register,
  login,
  updateUser,
  updateMMR,
} from "../controllers/authController.js";
import authenticateUser from "../middleware/auth.js";

router.route("/users").get(getAllUsers);
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/updateUser").patch(authenticateUser, updateUser);
router.route("/updateMMR").patch(authenticateUser, updateMMR);

export default router;
