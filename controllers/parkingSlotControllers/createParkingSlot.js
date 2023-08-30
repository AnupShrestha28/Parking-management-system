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

    // Check if a parking slot with the same slot number already exists
    const existingSlot = await ParkingSlot.findOne({
      slotNumber: slotNumber,
      location: locationId,
    });
    if (existingSlot) {
      return res.status(409).json({
        status: "failed",
        message:
          "A parking slot with the same slot number already exists for this location",
      });
    }

    // Check if the provided slot number exceeds the total number of slots
    if (slotNumber > parkingLocation.totalSlots) {
      return res.status(400).json({
        status: "failed",
        message: "Slot number exceeds the total number of available slots",
      });
    }

    // Check if the provided floor number exceeds the total number of floors
    if (floorNumber > parkingLocation.totalFloors) {
      return res.status(400).json({
        status: "failed",
        message: "Floor number exceeds the total number of available floors",
      });
    }

    // Check slot number constraints based on floor number
    const maxSlotNumber = floorNumber === 1 ? 10 : floorNumber * 10;
    if (slotNumber < (floorNumber - 1) * 10 + 1 || slotNumber > maxSlotNumber) {
      const errorMessage =
        floorNumber === 1
          ? `Invalid slot number for floor ${floorNumber}. It must be between 1 and 10.`
          : `Invalid slot number for floor ${floorNumber}. It must be between ${
              (floorNumber - 1) * 10 + 1
            } and ${maxSlotNumber}.`;

      return res.status(400).json({
        status: "failed",
        message: errorMessage,
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
