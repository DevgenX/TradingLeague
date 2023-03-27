import express from "express";
import {
  createHistory,
  getAllHistory,
} from "../controllers/historyController.js";

const router = express.Router();

router.route("/").get(getAllHistory);
router.route("/new").post(createHistory);

export default router;
