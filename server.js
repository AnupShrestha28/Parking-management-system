import express from "express";
import cors from "cors";
import connectDB from "./config/connectDB.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

const PORT = process.env.PORT || 8000;

// CORS Policy
app.use(cors());

// JSON
app.use(express.json());

// Load Routes
app.use("/api/user", userRoutes);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to establish database connection:", error);
  });