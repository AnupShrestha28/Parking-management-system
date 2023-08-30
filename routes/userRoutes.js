import express from "express";
const router = express.Router();

import registerController from "../controllers/userControllers/userRegister.js";
import loginController from "../controllers/userControllers/userLogin.js";
import changePassword from "../controllers/userControllers/changePassword.js";
import loggedUserController from "../controllers/userControllers/loggedUserController.js";
import passwordReset from "../controllers/userControllers/passwordReset.js";
import { getAllParking } from "../controllers/parkingLocationControllers/getAllParking.js";
import { getAvailableParking } from "../controllers/parkingLocationControllers/getAvailableParking.js";
import { getAllParkingSlots } from "../controllers/parkingSlotControllers/getAllParkingSlots.js";
import { createBooking } from "../controllers/bookingControllers/createBooking.js";
import { getUserBooking } from "../controllers/bookingControllers/getUserBooking.js";
import checkUserAuth from "../middleware/userAuth.js";

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

// Get all parking
router.get("/get-all-parking", checkUserAuth, getAllParking);

// Get specific available parking
router.get(
  "/get-available-parking/:locationId",
  checkUserAuth,
  getAvailableParking
);

// Get all parking slots
router.get("/get-all-parking-slots", checkUserAuth, getAllParkingSlots);

// Booking
router.post("/create-booking", checkUserAuth, createBooking);

// Get Booking details for a user
router.get("/user/bookings", checkUserAuth, getUserBooking);

export default router;
