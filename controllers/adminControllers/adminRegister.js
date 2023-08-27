import UserModel from "../../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; // Import jwt module

export const adminRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if an admin with the same email already exists
    const adminExists = await UserModel.findOne({ email, role: "admin" });
    if (adminExists) {
      return res.status(409).json({
        status: "failed",
        message: "Admin with this email already exists",
      });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new admin user
    const adminUser = new UserModel({
      name,
      email,
      password: hashedPassword,
      role: "admin",
    });

    await adminUser.save();

    // Generate a token for the registered admin user
    const token = jwt.sign({ userID: adminUser._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h", 
    });

    return res.status(201).json({
      status: "success",
      message: "Admin registered successfully",
      token: token, 
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: "failed", message: "Unable to register admin" });
  }
};
