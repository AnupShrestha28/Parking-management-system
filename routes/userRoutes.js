import express from "express";
const router = express.Router();
import registerController from "../controllers/registerController.js";
import loginController from "../controllers/loginController.js";
import changePassword from "../controllers/changePassword.js";
import loggedUserController from "../controllers/loggedUserController.js";
import passwordReset from "../controllers/passwordReset.js";
import checkUserAuth from "../middlewares/auth-middleware.js";

// Route level middleware - to protect route
router.use("/changePassword", checkUserAuth);
router.use("/loggedUser", checkUserAuth);

// public routes
router.post("/register", registerController.userRegistration);
router.post("/login", loginController.userLogin);
router.post(
  "/send-reset-password-email",
  passwordReset.sendUserPasswordResetEmail
);
router.post("/reset-password/:id/:token", passwordReset.userPasswordReset);

// protected routes
router.post("/changePassword", changePassword.changeUserPassword);
router.get("/loggedUser", loggedUserController.loggedUser);

export default router;
