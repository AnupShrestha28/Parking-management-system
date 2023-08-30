import UserModel from "../../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class PasswordReset {
  static sendUserPasswordResetEmail = async (req, res) => {
    try {
      const { email } = req.body;
      if (!email) {
        return res
          .status(400)
          .json({ status: "failed", message: "Email field is required" });
      }

      const user = await UserModel.findOne({ email: email });
      if (!user) {
        return res
          .status(404)
          .json({ status: "failed", message: "Email doesn't exist" });
      }

      const secret = user._id + process.env.JWT_SECRET_KEY;
      const token = jwt.sign({ userID: user._id }, secret, { expiresIn: "1h" });
      const link = `${getResetLink(user._id, token)}`;

      console.log(link);
      res.status(200).json({
        status: "success",
        message: "Password reset token and id sent in console.",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "failed",
        message: "Unable to send password reset email",
      });
    }
  };

  static userPasswordReset = async (req, res) => {
    try {
      const { password, password_confirmation } = req.body;
      const { id, token } = req.params;
      const user = await UserModel.findById(id);

      if (!user) {
        return res
          .status(404)
          .json({ status: "failed", message: "User not found" });
      }

      const new_secret = user._id + process.env.JWT_SECRET_KEY;
      jwt.verify(token, new_secret);

      if (!password || !password_confirmation) {
        return res
          .status(400)
          .json({ status: "failed", message: "All fields are required" });
      }

      if (password !== password_confirmation) {
        return res.status(400).json({
          status: "failed",
          message: "New password and confirm password do not match",
        });
      }

      const salt = await bcrypt.genSalt(10);
      const newHashPassword = await bcrypt.hash(password, salt);

      await UserModel.findByIdAndUpdate(user._id, {
        $set: { password: newHashPassword },
      });
      res.status(200).json({
        status: "success",
        message: "Password reset successfully",
      });
    } catch (error) {
      console.error(error);
      if (error.name === "TokenExpiredError") {
        res
          .status(400)
          .json({ status: "failed", message: "Token has expired" });
      } else {
        res.status(400).json({
          status: "failed",
          message: "Invalid token or password reset failed",
        });
      }
    }
  };
}

// Function to generate reset link
function getResetLink(userId, token) {
  return `${process.env.RESET_BASE_URL}/api/user/reset/${userId}/${token}`;
}

export default PasswordReset;
