import { StatusCodes } from "http-status-codes";
import { BadRequestError, unAuthenticatedError } from "../errors/index.js";
import Challenger from "../models/Challenger.js";
import History from "../models/History.js";

const getAllChallenges = async (req, res, next) => {
  const user_id = req.params.id;

  const challenges = await Challenger.find({ to_challenge: user_id })
    .populate({
      path: "challenger",
      select: "name mmr",
    })
    .sort({
      createdAt: -1,
    });

  if (!challenges) {
    throw new BadRequestError("failed to fetch challenges");
  }

  res.status(StatusCodes.OK).send(challenges);
};



const createChallenge = async (req, res, next) => {
  const challenge = req.body;

  const new_challenge = await Challenger.create(challenge);

  res.status(StatusCodes.OK).send(new_challenge);
};

const declineChallenge = async (req, res, next) => {
  const _id = req.params.id;
  const history_id = req.body.history_id;

  // UPDATE HISTORY - GAME_ID
  const history = await History.findOne({ _id: history_id });

  history.status = "declined";

  await history.save();

  // DELETE CHALLENGE
  await Challenger.findOneAndDelete({ _id });

  res.status(StatusCodes.OK).send("OK");
};

export { getAllChallenges, createChallenge, declineChallenge };
