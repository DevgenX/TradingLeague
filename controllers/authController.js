import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, unAuthenticatedError } from "../errors/index.js";

const getAllUsers = async (req, res, next) => {
  const users = await User.find({});

  if (!users) {
    throw new BadRequestError("failed to fetch users");
  }

  res.status(StatusCodes.OK).send(users);
};

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new BadRequestError("please provide all required values");
  }

  const UserAlreadyExists = await User.findOne({ email });

  if (UserAlreadyExists) {
    throw new BadRequestError(`${email} has been taken`);
  }

  const user = await User.create({ name, email, password });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({
    user: { name: user.name, email: user.email, mmr: user.mmr },
    token,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("please provide all required values");
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new unAuthenticatedError("Invalid Email or Password");
  }
  const isCorrectPassword = await user.comparePassword(password);
  if (!isCorrectPassword) {
    throw new unAuthenticatedError("Invalid Email or Password");
  }

  const token = user.createJWT();
  user.password = undefined;
  res.status(StatusCodes.OK).json({
    user,
    token,
  });
};

const updateUser = async (req, res) => {
  const { email, name } = req.body;

  if (!email || !name) {
    throw new BadRequestError("please provide all required values");
  }

  const user = await User.findOne({ _id: req.user.userId });

  user.email = email;
  user.name = name;

  await user.save();
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user, token });
};

const updateMMR = async (req, res) => {
  const new_mmr = req.body.new_mmr;

  const user = await User.findOne({ _id: req.user.userId });

  if (!user) {
    throw new BadRequestError("failed to fetch user");
  }

  user.mmr = parseInt(user.mmr) + parseInt(new_mmr);

  await user.save();

  res.status(StatusCodes.OK).send(user);
};

export { getAllUsers, register, login, updateUser, updateMMR };
