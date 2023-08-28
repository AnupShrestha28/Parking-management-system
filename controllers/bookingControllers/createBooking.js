import Booking from "../../models/booking.js";
import User from "../../models/user.js";
import ParkingSlot from "../../models/parkingSlots.js";
import mongoose from "mongoose";

export const createBooking = async (req, res) => {
  try {
    const { userId, parkingSlotId, startTime, endTime, paymentStatus, vehicleType } = req.body;

    // Check if the provided userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        status: "failed",
        message: "Invalid user ID",
      });
    }

    // Fetch the user using the provided userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        status: "failed",
        message: "User not found",
      });
    }

    // Check if the provided parkingSlotId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(parkingSlotId)) {
      return res.status(400).json({
        status: "failed",
        message: "Invalid parking slot ID",
      });
    }

    // Fetch the parking slot using the provided parkingSlotId
    const parkingSlot = await ParkingSlot.findById(parkingSlotId);

    if (!parkingSlot) {
      return res.status(404).json({
        status: "failed",
        message: "Parking slot not found",
      });
    }

    // Create a new booking with the populated user, parkingSlot, and vehicleType fields
    const newBooking = new Booking({
      user: userId,
      parkingSlot: parkingSlotId,
      startTime,
      endTime,
      paymentStatus,
      vehicleType, // Include the vehicleType field
    });

    await newBooking.save();

    res.status(201).json({
      status: "success",
      message: "Booking created successfully",
      booking: newBooking,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "failed",
      message: "Unable to create booking",
    });
  }
};
