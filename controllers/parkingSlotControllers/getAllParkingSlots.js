import ParkingSlot from "../../models/parkingSlots.js";
import ParkingLocation from "../../models/parkingLocation.js";
import Booking from "../../models/booking.js";

export const getAllParkingSlots = async (req, res) => {
  try {
    // Fetch all parking slots
    const allParkingSlots = await ParkingSlot.find();

    // Fetch all bookings that are active (current time is within booking period)
    const currentTime = new Date();
    const activeBookings = await Booking.find({
      startTime: { $lte: currentTime },
      endTime: { $gte: currentTime },
    });

    // Create an array of booked parking slot IDs from active bookings
    const bookedSlotIds = activeBookings.map((booking) => booking.parkingSlot.toString());

    // Fetch the parking locations for all parking slots
    const parkingSlotsWithLocations = await Promise.all(
      allParkingSlots.map(async (slot) => {
        const location = await ParkingLocation.findById(slot.location);
        return { ...slot.toJSON(), location };
      })
    );

    // Filter out the booked parking slots
    const availableParkingSlots = parkingSlotsWithLocations.filter(
      (slot) => !bookedSlotIds.includes(slot._id.toString())
    );

    if (availableParkingSlots.length === 0) {
      return res.status(404).json({
        status: "success",
        message: "No available parking slots",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Available parking slots retrieved successfully",
      availableParkingSlots,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "failed",
      message: "Unable to fetch available parking slots",
    });
  }
};
