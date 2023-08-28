import ParkingSlot from "../../models/parkingSlots.js";

export const getAllParkingSlots = async (req, res) => {
  try {
    const allParkingSlots = await ParkingSlot.find();

    res.status(200).json({
      status: "success",
      message: "All parking slots retrieved successfully",
      parkingSlots: allParkingSlots,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "failed",
      message: "Unable to fetch parking slots",
    });
  }
};
