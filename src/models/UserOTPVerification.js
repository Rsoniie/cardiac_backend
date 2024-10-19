import mongoose, { Schema } from "mongoose";

const UserOTPVerificationSchema = new Schema({
    user_id: {
        type: String,
    },
    otp: {
        type: String,
    },
    createdAt: {
        type: Date,
    },
    expiresAt: {
        type: Date
    }
})

const UserOTPVerification = mongoose.model("UserOTPVerification", UserOTPVerificationSchema);

export {UserOTPVerification}