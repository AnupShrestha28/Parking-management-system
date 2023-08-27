import ParkingLocation from "../../models/parkingLocation.js";
import mongoose from "mongoose";

export const deleteParking = async (req, res) => {
  try {
    const parkingId = req.params.id;

    // Check if the provided ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(parkingId)) {
      return res.status(400).json({
        status: "failed",
        message: "Invalid parking location ID",
      });
    }

    // Find the parking location by ID
    const existingParkingLocation = await ParkingLocation.findById(parkingId);

    if (!existingParkingLocation) {
      return res.status(404).json({
        status: "failed",
        message: "Parking location not found",
      });
    }

    // Delete the parking location
    await ParkingLocation.deleteOne({ _id: parkingId });

    res.status(200).json({
      status: "success",
      message: "Parking location deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "failed",
      message: "Unable to delete parking location",
    });
  }
};
