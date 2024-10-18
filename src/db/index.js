import { DB_NAME } from "../constants.js";
import mongoose from "mongoose";

const connectDB = async() => {
    try {
       const connectioninstance = await mongoose.connect(`${process.env.MONGODB_URI}${DB_NAME}`);
       console.log(`MondoDb conected successfully || DB connection ${connectioninstance.connection.host}`);
    }
    catch(err){
        console.log("connection failed", err);

    }
}

export default connectDB;