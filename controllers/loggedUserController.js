// import UserModel from "../models/user.js";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";

class loggedUserController {
  static loggedUser = async (req, res) => {
    res.send({ user: req.user });
  };
}

export default loggedUserController;
