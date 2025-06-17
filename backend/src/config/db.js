
import mongoose from "mongoose";
import dotenv from "dotenv";  

dotenv.config(); // Load environment variables from .env file
export const connectDB = async ()=>{
    try{
        mongoose.connect(process.env.MONGOOSE)
        console.log("Database connected successfully");
    }
    catch(err){
        console.error("Database connection failed:", err);
        process.exit(1); // Exit the process with failure
    }
}