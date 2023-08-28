import ParkingSlot from "../../models/parkingSlots.js";
import ParkingLocation from "../../models/parkingLocation.js";
import mongoose from "mongoose";
import validator from "validator";

export const createParkingSlot = async (req, res) => {
  try {
    const { floorNumber, slotNumber, locationId } = req.body;

    // Validate locationId as a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(locationId)) {
      return res.status(400).json({
        status: "failed",
        message: "Invalid parking location ID",
      });
    }

    // Validate floorNumber and slotNumber
    if (!validator.isInt(floorNumber.toString()) || floorNumber <= 0) {
      return res.status(400).json({
        status: "failed",
        message: "Invalid floor number",
      });
    }

    if (!validator.isInt(slotNumber.toString()) || slotNumber <= 0) {
      return res.status(400).json({
        status: "failed",
        message: "Invalid slot number",
      });
    }

    // Check if the associated parking location exists
    const parkingLocation = await ParkingLocation.findById(locationId);
    if (!parkingLocation) {
      return res.status(404).json({
        status: "failed",
        message: "Parking location not found",
      });
    }

    // Create a new parking slot
    const newParkingSlot = new ParkingSlot({
      floorNumber,
      slotNumber,
      location: locationId,
    });

    await newParkingSlot.save();

    res.status(201).json({
      status: "success",
      message: "Parking slot created successfully",
      parkingSlot: {
        _id: newParkingSlot._id,
        floorNumber: newParkingSlot.floorNumber,
        slotNumber: newParkingSlot.slotNumber,
        location: parkingLocation.name,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "failed",
      message: "Unable to create parking slot",
    });
  }
};
