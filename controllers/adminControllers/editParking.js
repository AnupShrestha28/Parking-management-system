import ParkingLocation from "../../models/parkingLocation.js";
import validator from "validator";
import mongoose from "mongoose";

export const editParking = async (req, res) => {
  try {
    const { id, name, address, totalFloors, totalSlots } = req.body;

    // Check if the provided ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        status: "failed",
        message: "Invalid parking location ID",
      });
    }

    // Find the parking location by ID
    const existingParkingLocation = await ParkingLocation.findById(id);

    if (!existingParkingLocation) {
      return res.status(404).json({
        status: "failed",
        message: "Parking location not found",
      });
    }

    // Validate and update fields if provided
    if (validator.isEmpty(name)) {
      return res.status(400).json({
        status: "failed",
        message: "Name field is required",
      });
    } else {
      existingParkingLocation.name = name;
    }

    if (validator.isEmpty(address)) {
      return res.status(400).json({
        status: "failed",
        message: "Address field is required",
      });
    } else {
      existingParkingLocation.address = address;
    }

    if (validator.isEmpty(String(totalFloors))) {
      return res.status(400).json({
        status: "failed",
        message: "Total floors field is required",
      });
    } else if (!validator.isInt(String(totalFloors), { min: 1 })) {
      return res.status(400).json({
        status: "failed",
        message: "Total floors must be a positive integer",
      });
    } else {
      existingParkingLocation.totalFloors = totalFloors;
    }

    if (validator.isEmpty(String(totalSlots))) {
      return res.status(400).json({
        status: "failed",
        message: "Total slots field is required",
      });
    } else if (!validator.isInt(String(totalSlots), { min: 1 })) {
      return res.status(400).json({
        status: "failed",
        message: "Total slots must be a positive integer",
      });
    } else {
      existingParkingLocation.totalSlots = totalSlots;
    }

    await existingParkingLocation.save();

    res.status(200).json(existingParkingLocation);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "failed", message: "Unable to update parking location" });
  }
};
