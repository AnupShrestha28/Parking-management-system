import ParkingLocation from "../../models/parkingLocation.js";

export const getAllParking = async (req, res) => {
  try {
    const allParkingLocations = await ParkingLocation.find();

    if (allParkingLocations.length === 0) {
      return res.status(404).json({
        status: "success",
        message: "Parking locations not available",
      });
    }

    res.status(200).json(allParkingLocations);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ status: "failed", message: "Unable to fetch parking locations" });
  }
};
