import UserModel from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class LoginController {
  static userLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ status: "failed", message: "All fields are required" });
      }

      const user = await UserModel.findOne({ email: email });
      if (!user) {
        return res.status(401).json({ status: "failed", message: "Invalid credentials" });
      }

      const isMatch = bcrypt.compareSync(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ status: "failed", message: "Invalid credentials" });
      }

      const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1h", 
      });

      res.status(200).json({
        status: "success",
        message: "Login successful",
        token: token,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: "failed", message: "Unable to login" });
    }
  };
}

export default LoginController;
