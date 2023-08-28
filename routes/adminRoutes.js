import express from "express";
const router = express.Router();

import { createParking } from "../controllers/adminControllers/createParking.js";
import { editParking } from "../controllers/adminControllers/editParking.js";
import { deleteParking } from "../controllers/adminControllers/deleteParking.js";
import { getAllParking } from "../controllers/parkingLocationControllers/getAllParking.js";
import { getAvailableParking } from "../controllers/parkingLocationControllers/getAvailableParking.js";
import { createParkingSlot } from "../controllers/parkingSlotControllers/createParkingSlot.js";
import { editParkingSlot } from "../controllers/parkingSlotControllers/editParkingSlot.js";
import { deleteParkingSlot } from "../controllers/parkingSlotControllers/deleteParkingSlot.js";
import { getAllParkingSlots } from "../controllers/parkingSlotControllers/getAllParkingSlots.js";
import adminAuthMiddleware from "../middlewares/adminAuth.js";

import { adminRegister } from "../controllers/adminControllers/adminRegister.js";
import { adminLogin } from "../controllers/adminControllers/adminLogin.js";

// Admin registration adn login
router.post("/admin-register", adminRegister);
router.post("/admin-login", adminLogin);

// Admin CRUD Operations
router.post("/add-parking", adminAuthMiddleware, createParking);
router.put("/edit-parking/:id", adminAuthMiddleware, editParking);
router.delete("/delete-parking/:id", adminAuthMiddleware, deleteParking);

// Get all Parking
router.get("/get-all-parking", adminAuthMiddleware, getAllParking);

// Get specific available parking
router.get(
  "/get-available-parking/:locationId",
  adminAuthMiddleware,
  getAvailableParking
);

// Admin parking slot CRUD
router.post("/create-parking-slot", adminAuthMiddleware, createParkingSlot);
router.put("/edit-parking-slot/:slotId", adminAuthMiddleware, editParkingSlot);
router.delete(
  "/delete-parking-slot/:slotId",
  adminAuthMiddleware,
  deleteParkingSlot
);

// Get all parking slots
router.get("/get-all-parking-slots",adminAuthMiddleware, getAllParkingSlots);


export default router;
