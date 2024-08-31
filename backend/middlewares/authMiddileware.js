// verify token 

import jwt from "jsonwebtoken";
import { User } from "../models/UserModel.js";
import asyncHandler from "express-async-handler";

const protect = asyncHandler(async (req, res, next) => {
  let token;
// we taking token from cookie this time 
  token = req.cookies.jwt;

  if (token) {
    try {
      const verifyToken = await jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(verifyToken.userId).select("-password");

      next()
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized Invalid token");
    }
  } else {
    res.status(401);
    throw new Error("not authorized no token");
  }
});

export {protect}