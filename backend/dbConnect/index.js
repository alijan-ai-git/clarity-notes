import mongoose from "mongoose";
const connectDB = async () => {
    try {
        const uri = `${process.env.MONGODB_URI}`;
        const connectionInstance = await mongoose.connect(uri);
        console.log(
            `MongoDB connected !! Host: ${connectionInstance.connection.host}`
        );
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    }
};

export default connectDB;