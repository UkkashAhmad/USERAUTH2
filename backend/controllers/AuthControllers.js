import asyncHandler from "express-async-handler";
import { User } from "../models/UserModel.js";
import generateToken from "../utils/generateToken.js";

const Register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    username,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      id: user._id,
      name: user.username,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const Login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  // now we are checking email and comparing password too
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(200).json({
      id: user._id,
      name: user.username,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error("Invalid email or password");
  }
});

const Logout = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json("user logged out");
};

const GetUser = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    username: req.user.username,
    email: req.user.email,
  };
  res.status(200).json(user);
});

const UpdateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.username = req.body.name || user.username;
    user.email = req.body.email || user.email;

    if(req.body.password){
        user.password = req.body.password
    }
    const updatedUser = await user.save()
    res.status(200).json({
        message:"data Updated",
        data:{
            _id : updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email
        }
    })
  } else {
    res.status(404)
    throw new Error('User not found')
}
});

export { Register, Login, Logout, UpdateUser, GetUser };
