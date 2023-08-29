import mongoose from "mongoose";

const parkingSlotSchema = new mongoose.Schema(
  {
    floorNumber: {
      type: Number,
      required: true,
    },
    slotNumber: {
      type: Number,
      required: true,
    },
    location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ParkingLocation",
      required: true,
    },
    isBooked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const ParkingSlot = mongoose.model("ParkingSlot", parkingSlotSchema);

export default ParkingSlot;
