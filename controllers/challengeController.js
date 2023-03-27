import { StatusCodes } from "http-status-codes";
import { BadRequestError, unAuthenticatedError } from "../errors/index.js";
import Challenger from "../models/Challenger.js";

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

export { getAllChallenges, createChallenge };
