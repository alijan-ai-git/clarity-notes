import mongoose from "mongoose";
import { Schema } from "mongoose";
import bcrypt from "bcryptjs";


const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 20,
        numeric: false,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    fullName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 100,
    },
}, { timestamps: true });

// Hash the password before saving the user model
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) { // Only hash the password if it has been modified (or is new) 
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password.salt);
        next();
    } catch (error) {
        return next(error);
    }
});

// Method to compare given password with the database hash
userSchema.methods.comparePassword = async function (next) {
    return bcrypt.compare(next, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;