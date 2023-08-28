import ParkingSlot from "../../models/parkingSlots.js";
import validator from "validator";
import mongoose from "mongoose";

export const editParkingSlot = async (req, res) => {
  try {
    const slotId = req.params.slotId;
    const { slotNumber, floorNumber } = req.body;

    // Validate slotId as a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(slotId)) {
      return res.status(400).json({
        status: "failed",
        message: "Invalid parking slot ID",
      });
    }

    // Find the parking slot by ID
    const parkingSlot = await ParkingSlot.findById(slotId);

    if (!parkingSlot) {
      return res.status(404).json({
        status: "failed",
        message: "Parking slot not found",
      });
    }

    // Update the parking slot properties
    if (slotNumber !== undefined) {
      if (!validator.isNumeric(slotNumber.toString(), { no_symbols: true })) {
        return res.status(400).json({
          status: "failed",
          message: "Invalid slot number",
        });
      }
      parkingSlot.slotNumber = slotNumber;
    }
    if (floorNumber !== undefined) {
      if (!validator.isInt(floorNumber.toString(), { min: 1 })) {
        return res.status(400).json({
          status: "failed",
          message: "Invalid floor number",
        });
      }
      parkingSlot.floorNumber = floorNumber;
    }

    // Save the updated parking slot
    await parkingSlot.save();

    res.status(200).json({
      status: "success",
      message: "Parking slot updated successfully",
      parkingSlot,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ status: "failed", message: "Unable to update parking slot" });
  }
};
