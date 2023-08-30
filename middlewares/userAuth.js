import jwt from "jsonwebtoken";
import UserModel from "../models/user.js";

const checkUserAuth = async (req, res, next) => {
  let token;

  // Get token from the Authorization header
  const { authorization } = req.headers;
  if (authorization && authorization.startsWith("Bearer")) {
    try {
      // Extract token from the header
      token = authorization.split(" ")[1];

      // Verify token
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

      if (!decodedToken) {
        return res.status(403).json({
          status: "failed",
          message: "Unauthorized: Invalid token",
        });
      }

      // Fetch the user from the database using the user ID in the token
      const user = await UserModel.findById(decodedToken.userID).select(
        "-password"
      );

      if (!user) {
        return res.status(401).json({
          status: "failed",
          message: "Unauthorized: User not found",
        });
      }

      // Attach the user object to the request
      req.user = user;
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({
        status: "failed",
        message: "Unauthorized User",
      });
    }
  } else {
    res.status(401).json({
      status: "failed",
      message: "Unauthorized User, No token",
    });
  }
};

export default checkUserAuth;
