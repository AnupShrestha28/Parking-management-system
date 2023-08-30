import Booking from "../../models/booking.js";

export const getUserBooking = async (req, res) => {
  try {
    // Get the user ID from the authenticated user
    const userId = req.user._id;

    // Find all bookings associated with the user
    const bookings = await Booking.find({ user: userId })
      .populate({
        path: "parkingSlot",
        select: "slotNumber floorNumber location",
        populate: {
          path: "location",
          select: "name address totalFloors totalSlots",
        },
      })
      .select("-__v");

    if (bookings.length === 0) {
      return res.status(200).json({
        status: "success",
        message: "Your bookings are empty",
      });
    }

    res.status(200).json({
      status: "success",
      bookings,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "failed",
      message: "Unable to fetch bookings",
    });
  }
};
