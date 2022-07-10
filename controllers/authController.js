import User from "../models/Users.js";
import { BadRequestError, UnauthenticatedError } from "../errors/index.js";
import { StatusCodes } from "http-status-codes";
import bcryptjs from "bcryptjs";
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
  // const userAlreadyExist = User.findOne({ email });
  // if (userAlreadyExist) {
  //   throw new BadRequestError("Email already exist");
  // }
  const user = await User.create(req.body);
  //console.log(req.body);
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({
    user: {
      name: user.name,
      email: user.email,
      lastName: user.lastName,
      location: user.location,
    },
    token,
    location: "my city",
  });
};
const login = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("please provide all values");
  }
  const user = await User.findOne({ email: email }).select("+password");
  console.log(user);
  if (!user) {
    throw new UnauthenticatedError("no user with this email");
  }

  // const isPasswordCorrect = await bcryptjs.compare(password, user.password);
  const isPasswordCorrect = await user.checkPassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("invalid login");
  }
  const token = user.createJWT();
  user.password = undefined;
  res.status(StatusCodes.OK).json({ user, token, location: user.location });
};
const updateUser = async (req, res) => {
  res.send("update user");
};

export { register, login, updateUser };
