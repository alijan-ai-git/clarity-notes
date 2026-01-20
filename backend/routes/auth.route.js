import express from "express";
import { loginUser, registerUser } from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected route example
router.get("/dashboard", verifyToken, (req, res) => {
    res.status(200).json({ message: `Welcome ${req.user.email}` });
});

export default router;
