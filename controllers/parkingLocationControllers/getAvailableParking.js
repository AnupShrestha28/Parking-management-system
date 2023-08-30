import parkingLocation from "../../models/parkingLocation.js";

export const getAvailableParking = async (req, res) => {
  try {
    const locationId = req.params.locationId;

    // Find the parking location by ID
    const location = await parkingLocation.findById(locationId);

    if (!location) {
      return res.status(404).json({
        status: "failed",
        message: "Parking location not found",
      });
    }

    const availableParking = location.totalSlots - location.bookedSlots;

    res.status(200).json({
      status: "success",
      message: "Available parking slots retrieved",
      parkingLocation: {
        name: location.name,
        address: location.address,
        totalFloors: location.totalFloors,
        totalSlots: location.totalSlots,
        bookedSlots: location.bookedSlots,
      },
      availableParking: availableParking,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        status: "failed",
        message: "Unable to retrieve available parking",
      });
  }
};
