import ParkingLocation from "../../models/parkingLocation.js";
import validator from "validator";

export const createParking = async (req, res) => {
  try {
    const { name, address, totalFloors, totalSlots } = req.body;

    // Validate inputs
    if (!name) {
      return res.status(400).json({
        status: "failed",
        message: "Please provide a name for the parking location",
      });
    }

    if (!address) {
      return res.status(400).json({
        status: "failed",
        message: "Please provide an address for the parking location",
      });
    }

    if (!totalFloors) {
      return res.status(400).json({
        status: "failed",
        message:
          "Please provide the total number of floors for the parking location",
      });
    }

    if (!totalSlots) {
      return res.status(400).json({
        status: "failed",
        message:
          "Please provide the total number of slots for the parking location",
      });
    }

    // Additional validation for specific fields
    if (!validator.isInt(String(totalFloors), { min: 1 })) {
      return res.status(400).json({
        status: "failed",
        message: "Total floors must be a positive integer",
      });
    }

    if (!validator.isInt(String(totalSlots), { min: 1 })) {
      return res.status(400).json({
        status: "failed",
        message: "Total slots must be a positive integer",
      });
    }

    const newParkingLocation = new ParkingLocation({
      name,
      address,
      totalFloors,
      totalSlots,
      bookedSlots: 0,
    });

    await newParkingLocation.save();
    res.status(201).json(newParkingLocation);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "failed", message: "Unable to create parking location" });
  }
};
