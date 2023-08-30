import UserModel from "../../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await UserModel.findOne({ email, role: "admin" });
    if (!admin) {
      return res.status(401).json({
        status: "failed",
        message: "This email is not registered as an admin",
      });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({
        status: "failed",
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { userID: admin._id, role: admin.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      status: "success",
      message: "Admin login successful",
      token,
      adminID: admin._id,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "failed",
      message: "Unable to perform admin login",
    });
  }
};
