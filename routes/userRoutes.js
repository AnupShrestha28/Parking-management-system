import express from "express";
const router = express.Router();
import registerController from "../controllers/registerController.js";
import loginController from "../controllers/loginController.js";

// public routes
router.post("/register", registerController.userRegistration);
router.post("/login", loginController.userLogin);

// private routes


export default router;