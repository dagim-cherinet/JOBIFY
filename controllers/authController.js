import User from "../models/Users.js";
import { BadRequestError } from "../errors/index.js";
import { StatusCodes } from "http-status-codes";
const register = async (req, res) => {
  // res.send("register controller...");
  // try {
  //   const user = await User.create(req.body);
  //   console.log(req.body);
  //   res.status(201).json({ user });
  // } catch (err) {
  //   // res.status(500).json({ msg: "something went wrong ...." });
  //   next(err);
  // }

  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new BadRequestError("please provide all values");
  }
  const userAlreadyExist = User.findOne({ email });
  if (userAlreadyExist) {
    throw new BadRequestError("Email already exist");
  }
  const user = await User.create(req.body);
  console.log(req.body);
  res.status(StatusCodes.CREATED).json({ user });
};
const login = async (req, res) => {
  res.send("login");
};
const updateUser = async (req, res) => {
  res.send("update user");
};

export { register, login, updateUser };
