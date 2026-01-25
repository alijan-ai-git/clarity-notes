// controllers/auth.controller.js

import User from "../models/userSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "mysecretkey";

/*
|--------------------------------------------------------------------------
| REGISTER USER
|--------------------------------------------------------------------------
*/
export const registerUser = async (req, res) => {
    try {
        // req.body is ALREADY parsed by express.json() in server.js
        const { userName, email, password, fullName } = req.body;

        // Basic validation (prevents silent crashes)
        if (!userName || !email || !password || !fullName) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ userName });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
            });
        }

        // Hash password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = new User({
            userName,
            email,
            password: hashedPassword, // ✅ FIXED typo
            fullName,
        });

        await newUser.save();

        return res.status(201).json({
            message: "User registered successfully",
        });
    } catch (error) {
        console.error("REGISTER ERROR:", error);
        return res.status(500).json({
            message: "Server error",
        });
    }
};

/*
|--------------------------------------------------------------------------
| LOGIN USER
|--------------------------------------------------------------------------
*/
export const loginUser = async (req, res) => {
    try {
        // Debug FIRST
        console.log("REQ BODY:", req.body);

        const { userName, password } = req.body;

        // Validation
        if (!userName || !password) {
            return res.status(400).json({
                message: "Username and password are required",
            });
        }

        // Find user
        const user = await User.findOne({ userName });
        if (!user) {
            return res.status(400).json({
                message: "Invalid credentials",
            });
        }

        // Compare password
        const isPasswordValid = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordValid) {
            return res.status(400).json({
                message: "Invalid credentials",
            });
        }

        // Create JWT
        const token = jwt.sign(
            {
                userId: user._id,
                userName: user.userName,
            },
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        return res.status(200).json({
            message: "Login successful",
            token,
        });
    } catch (error) {
        console.error("LOGIN ERROR:", error);
        return res.status(500).json({
            message: "Server error",
        });
    }
};
