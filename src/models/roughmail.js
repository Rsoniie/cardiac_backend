import mongoose from "mongoose";

const sendMail = new mongoose.Schema({
   email: {
    type: String,
    required : true
   }
})

const Mail = mongoose.model("Mail", sendMail);
export {Mail}