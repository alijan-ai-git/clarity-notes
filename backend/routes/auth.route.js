// routes/auth.route.js
import express from "express";
import { loginUser, registerUser } from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected routes
router.get("/dashboard", verifyToken, (req, res) => {
    res.status(200).json({
        message: `Welcome ${req.user.userName}`,
        user: req.user,
    });
});

export default router;

