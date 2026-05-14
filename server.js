import express from "express";
import dotenv from "dotenv";
// import contactRoutes from "./routes/contactRoutes.js";
import connectDB from "./config/db.js";
import cors from "cors";
import consultancyRoutes from "./routes/consultancyRoutes.js"
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to DB
connectDB();

// Routes
app.use("/api/consultancy-routes", consultancyRoutes);



const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
