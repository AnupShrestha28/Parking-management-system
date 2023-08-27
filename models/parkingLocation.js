import mongoose from "mongoose";

const parkingLocationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    totalFloors: {
      type: Number,
      required: true,
    },
    totalSlots: {
      type: Number,
      required: true,
    },
    bookedSlots: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const ParkingLocation = mongoose.model("ParkingLocation", parkingLocationSchema);

export default ParkingLocation;
