import express from "express";
const router = express.Router();
import registerController from "../controllers/registerController.js";
import loginController from "../controllers/loginController.js";
import changePassword from "../controllers/changePassword.js";
import checkUserAuth from "../middlewares/auth-middleware.js";

// Route level middleware - to protect route
router.use("/changePassword", checkUserAuth);

// public routes
router.post("/register", registerController.userRegistration);
router.post("/login", loginController.userLogin);

// protected routes
router.post("/changePassword", changePassword.changeUserPassword);

export default router;
