import dotenv from "dotenv";
dotenv.config();


// auth controller with register and login funtions
import User from "../models/userSchema.js";
import dbConnect from "../dbConnect/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

dbConnect();

const JWT_SECRET = process.env.JWT_SECRET || "mysecretkey";

//register user
export const registerUser = async (req, res) => {
    const { userName, email, password, fullName } = req.body;
    try {
        const existingUser = await User.findOne({ userName });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            userName,
            email,
            passowrd: hashedPassword,
            fullName
        })
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

// login user
export const loginUser = async (req, res) => {
    const { userName, password } = req.body;
    try {
        const user = await User.findOne({ userName });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign(
            { userId: user._id, userName: user.userName },
            JWT_SECRET,
            { expiresIn: "1h" },
        );
        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}