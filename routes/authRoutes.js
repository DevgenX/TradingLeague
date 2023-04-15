import express from "express";
const router = express.Router();
import multer from "multer";

const storage = multer.memoryStorage({
  destination: "uploads/",
  filename: function (req, file, cb) {
    cb(null, req.body.id + ".jpg");
  },
});

const upload = multer({ storage: storage });

import {
  getAllUsers,
  register,
  login,
  updateUser,
  updateMMR,
  uploadProfilePic,
  getProfilePic,
} from "../controllers/authController.js";
import authenticateUser from "../middleware/auth.js";

router.route("/users").get(getAllUsers);
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/updateUser").patch(authenticateUser, updateUser);
router.route("/updateMMR").patch(authenticateUser, updateMMR);
router
  .route("/upload")
  .patch(upload.single("avatar"), authenticateUser, uploadProfilePic);
router.route("/profilepic/:id").get(getProfilePic);

export default router;
