import express from "express";
import {
  createChallenge,
  getAllChallenges,
} from "../controllers/challengeController.js";

const router = express.Router();

router.route("/:id").get(getAllChallenges);
router.route("/new").post(createChallenge);

export default router;
