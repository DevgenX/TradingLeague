import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors/index.js";

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
  res
    .status(StatusCodes.OK)
    .json({
      user: { name: user.name, email: user.email, mmr: user.mmr },
      token,
    });
};

const login = (req, res) => {
  res.send("login");
};

const updateUser = (req, res) => {
  res.send("update user");
};

export { register, login, updateUser };
