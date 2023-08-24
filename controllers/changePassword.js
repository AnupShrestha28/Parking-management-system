import UserModel from "../models/user.js";
import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";

class changePassword {
  static changeUserPassword = async (req, res) => {
    const { password, password_confirmation } = req.body;

    if (password && password_confirmation) {
      if (password !== password_confirmation) {
        res.send({
          status: "failed",
          message: "New password and confirm new password doesn't match",
        });
      } else {
        const salt = await bcrypt.genSalt(10);
        const newHashPassword = await bcrypt.hash(password, salt);

        await UserModel.findByIdAndUpdate(req.user._id, {
          $set: { password: newHashPassword },
        });

        res.send({
          status: "success",
          message: "Password changed successfully",
        });
      }
    } else {
      res.send({ status: "failed", message: "All fields are required" });
    }
  };
}

export default changePassword;
