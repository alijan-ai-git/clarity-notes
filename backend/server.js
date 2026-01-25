import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRouter from "./routes/auth.route.js";
import noteRouter from "./routes/note.route.js";
import connectDB from "./dbConnect/index.js";

dotenv.config();

// ---- DB CONNECTION ----
connectDB();

const app = express();

// ---- PORT SAFETY ----
// If PORT is missing in .env, fallback prevents silent failure
const PORT = process.env.PORT || 5000;

// ---- MIDDLEWARE ----
app.use(cors());            // allow frontend to talk to backend
app.use(express.json());    // parse JSON body (IMPORTANT for req.body)

// ---- HEALTH CHECK (DEBUG TOOL) ----
app.get("/", (req, res) => {
    res.send("API is running");
});

// ---- ROUTES ----
// Mount each router ONCE with a clear base path
app.use("/api/auth", authRouter);
app.use("/api/notes", noteRouter);

// ---- START SERVER ----
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
