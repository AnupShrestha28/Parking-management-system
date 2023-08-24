import UserModel from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class registerController{
    static userRegistration = async (req, res) => {
        const { name, email, password, password_confirmation, tc } = req.body;
        const user = await UserModel.findOne({ email: email });
    
        if (user) {
          res.send({ status: "failed", message: "Email already exists" });
        } else {
          if (name && email && password && password_confirmation && tc) {
            if (password === password_confirmation) {
              try {
                const salt = await bcrypt.genSalt(10);
                const hashPassword = await bcrypt.hash(password, salt);
                const doc = new UserModel({
                  name: name,
                  email: email,
                  password: hashPassword,
                  tc: tc,
                });
                await doc.save();
                const saved_user = await UserModel.findOne({ email: email });
    
                // GenerateJWT token
                const token = jwt.sign(
                  { userID: saved_user._id },
                  process.env.JWT_SECRET_KEY,
                  {
                    expiresIn: "5m",
                  }
                );
                res.status(201).send({
                  status: "success",
                  message: "Successfully registered",
                  token: token,
                });
              } catch (error) {
                console.log(error);
                res.send({
                  status: "failed",
                  message: "Unable to register",
                });
              }
            } else {
              res.send({
                status: "failed",
                message: "Password and confirm password doesn't match",
              });
            }
          } else {
            res.send({ status: "failed", message: "All fields are required" });
          }
        }
      };
}

export default registerController;