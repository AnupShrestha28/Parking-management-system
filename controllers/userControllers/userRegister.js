import UserModel from "../../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator"; 

class RegisterController {
  static userRegistration = async (req, res) => {
    try {
      const { name, email, password, password_confirmation, tc } = req.body;

      // Validate email format
      if (!validator.isEmail(email)) {
        return res.status(400).json({ status: "failed", message: "Invalid email format" });
      }

      // Validate password strength
      if (!validator.isStrongPassword(password)) {
        return res.status(400).json({
          status: "failed",
          message: "Password must be at least 8 characters long and contain a mix of uppercase, lowercase, digits, and special characters",
        });
      }

      const user = await UserModel.findOne({ email: email });

      if (user) {
        return res.status(409).json({ status: "failed", message: "Email already exists" });
      }

      if (password !== password_confirmation) {
        return res.status(400).json({
          status: "failed",
          message: "Password and confirm password do not match",
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);

      const newUser = new UserModel({
        name: name,
        email: email,
        password: hashPassword,
        tc: tc,
      });
      await newUser.save();

      const savedUser = await UserModel.findOne({ email: email });

      const token = jwt.sign({ userID: savedUser._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1h", 
      });

      return res.status(201).json({
        status: "success",
        message: "Successfully registered",
        token: token,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: "failed", message: "Unable to register" });
    }
  };
}

export default RegisterController;