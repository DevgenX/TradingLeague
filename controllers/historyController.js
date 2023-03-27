import { StatusCodes } from "http-status-codes";
import { BadRequestError, unAuthenticatedError } from "../errors/index.js";
import History from "../models/History.js";
import Challenger from "../models/Challenger.js";

const getAllHistory = async (req, res, next) => {
  const history = await History.find({ owner: req.user.userId });

  if (!history) {
    throw new BadRequestError("failed to fetch history");
  }

  res.status(StatusCodes.OK).send(history);
};

const createHistory = async (req, res, next) => {
  const history = req.body;

  const new_history = await History.create(history);

  res.status(StatusCodes.OK).send(new_history);
};

const updateHistory = async (req, res, next) => {
  const history = req.body.history;
  const challenge_id = req.body.challenge_id;

  const to_update_history = await History.findOne({ _id: history_id });
  to_update_history.user_2 = history.user_2;
  to_update_history.status = history.status;

  await to_update_history.save();

  // REMOVE CHALLENGE FROM DB
  await Challenger.findOneAndDelete({ _id: challenge_id });

  res.status(StatusCodes.OK).send("OK");
};

export { getAllHistory, createHistory, updateHistory };
