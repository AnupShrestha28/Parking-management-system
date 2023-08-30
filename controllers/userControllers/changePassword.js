import UserModel from "../../models/user.js";
import bcrypt from "bcrypt";

class ChangePassword {
  static changeUserPassword = async (req, res) => {
    try {
      const { password, password_confirmation } = req.body;

      if (!password || !password_confirmation) {
        return res
          .status(400)
          .json({ status: "failed", message: "All fields are required" });
      }

      if (password !== password_confirmation) {
        return res.status(400).json({
          status: "failed",
          message: "New password and confirm new password don't match",
        });
      }

      const salt = await bcrypt.genSalt(10);
      const newHashPassword = await bcrypt.hash(password, salt);

      await UserModel.findByIdAndUpdate(req.user._id, {
        $set: { password: newHashPassword },
      });

      return res.status(200).json({
        status: "success",
        message: "Password changed successfully",
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ status: "failed", message: "Unable to change password" });
    }
  };
}

export default ChangePassword;
