import { StatusCodes } from "http-status-codes";
import { BadRequestError, unAuthenticatedError } from "../errors/index.js";
import History from "../models/History.js";

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

export { getAllHistory, createHistory };
