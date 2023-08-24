import UserModel from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class loginController{
    static userLogin = async (req, res) => {
        try {
          const { email, password } = req.body;
          if (email && password) {
            const user = await UserModel.findOne({ email: email });
    
            if (user != null) {
              const isMatch = await bcrypt.compare(password, user.password);
    
              if (user.email === email && isMatch) {
                // Generate JWT Token
                const token = jwt.sign(
                  { userID: user._id },
                  process.env.JWT_SECRET_KEY,
                  {
                    expiresIn: "5m",
                  }
                );
    
                res.send({
                  status: "success",
                  message: "Login Success",
                  token: token,
                });
              } else {
                res.send({
                  status: "failed",
                  message: "Email or password is not valid",
                });
              }
            } else {
              res.send({ status: "failed", message: "You are not a registered" });
            }
          } else {
            res.send({ status: "failed", message: "All fields are required" });
          }
        } catch (error) {
          console.log(error);
          res.send({ status: "failed", message: "Unable to login" });
        }
      };
}

export default loginController;