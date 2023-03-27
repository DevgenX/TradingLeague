import express from "express";
import {
  createHistory,
  getAllHistory,
  updateHistory,
} from "../controllers/historyController.js";
import authenticateUser from "../middleware/auth.js";

const router = express.Router();

router.route("/").get(authenticateUser, getAllHistory);
router.route("/new").post(createHistory);
router.route("/update").patch(updateHistory);

export default router;
