import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.route.js";
import noteRouter from "./routes/note.route.js";
import connectDB from "./dbConnect/index.js";
import dotenv from 'dotenv';

dotenv.config();
connectDB();
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
// Auth routes
app.use(authRouter);
// Note routes 
app.use("/notes", noteRouter);

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})