import express from "express";
const router = express.Router();

import { createParking } from "../controllers/adminControllers/createParking.js";
import { editParking } from "../controllers/adminControllers/editParking.js";
import { deleteParking } from "../controllers/adminControllers/deleteParking.js";
import { getAllParking } from "../controllers/parkingLocationControllers/getAllParking.js";
import { getAvailableParking } from "../controllers/parkingLocationControllers/getAvailableParking.js";
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
  


export default router;