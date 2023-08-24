import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    const DB_URL = process.env.MONGODB_URI;

    if (!DB_URL) {
      throw new Error("MongoDB URI not provided in environment variables.");
    }

    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("DB Connection success");
  } catch (error) {
    if (error.name === "MongoNetworkError") {
      console.error("DB ERROR: Network issue -", error.message);
    } else if (error.name === "MongoTimeoutError") {
      console.error("DB ERROR: Connection timeout -", error.message);
    } else {
      console.error("DB ERROR:", error.message);
    }
  }
};

export default connectDB;