import jwt from "jsonwebtoken";
import UserModel from "../models/user.js";

const adminAuthMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        status: "failed",
        message: "Unauthorized: Token not provided",
      });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decodedToken || decodedToken.role !== "admin") {
      return res.status(403).json({
        status: "failed",
        message: "Unauthorized: Only admins can access this resource",
      });
    }

    const admin = await UserModel.findById(decodedToken.userID);
    if (!admin) {
      return res.status(401).json({
        status: "failed",
        message: "Unauthorized: Admin not found",
      });
    }

    req.admin = admin; 
    next(); 
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "failed",
      message: "Internal server error",
    });
  }
};

export default adminAuthMiddleware;
