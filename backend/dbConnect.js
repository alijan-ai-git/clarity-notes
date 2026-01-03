import mongoose from "mongoose";

const dbName = "notes-app";

const connectDB = async () => {
    try {
        const uri = `mongodb+srv://alijan998457:18102006ali@cluster0.fsyhd.mongodb.net/${dbName}?retryWrites=true&w=majority`;

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