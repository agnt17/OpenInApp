import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";

export const verifyJWT = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Unauthorized request. Please log in.");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);


    const user = await User.findById(decodedToken?.userId).select(
      "-password -refreshToken"
    );
    if (!user) {
      throw new ApiError(401, "Invalid access token.");
    }

 
    req.user = user;
    next();
    // req.task = task;
    // next();n
  } catch (error) {
    next(error);
  }
};
