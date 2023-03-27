import express from "express";
import {
  createChallenge,
  declineChallenge,
  getAllChallenges,
} from "../controllers/challengeController.js";

const router = express.Router();

router.route("/new").post(createChallenge);
router.route("/:id").get(getAllChallenges);
router.route("/decline/:id").patch(declineChallenge);

export default router;
