import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  // 1: cookie name 2: what u want to assign 3:options about this cookie

  res.cookie("jwt", token, {
    // work only http not https bcz in development use http
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    // crf attack
    sameSite: "strict",
    // cookie will expire wihtin
    maxAge: 1 * 24 * 60 * 60 * 1000,
  });
};

export default generateToken;
