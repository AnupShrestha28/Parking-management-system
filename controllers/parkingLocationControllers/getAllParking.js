import ParkingLocation from "../../models/parkingLocation.js";

export const getAllParking = async (req, res) => {
  try {
    const allParkingLocations = await ParkingLocation.find();
    res.status(200).json(allParkingLocations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "failed", message: "Unable to fetch parking locations" });
  }
};