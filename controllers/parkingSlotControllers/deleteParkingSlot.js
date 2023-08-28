import ParkingSlot from "../../models/parkingSlots.js";
import mongoose from "mongoose";

export const deleteParkingSlot = async (req, res) => {
  try {
    const slotId = req.params.slotId;

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

    // Delete the parking slot
    await parkingSlot.deleteOne({ _id: slotId });

    res.status(200).json({
      status: "success",
      message: "Parking slot deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ status: "failed", message: "Unable to delete parking slot" });
  }
};
