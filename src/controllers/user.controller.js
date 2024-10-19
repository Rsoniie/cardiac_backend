import { User } from '../models/user.models.js';
import { UserOTPVerification } from '../models/UserOTPVerification.js';
import { Mail } from '../models/roughmail.js';
import express from "express";
import bcrypt from 'bcryptjs';
import nodemailer from "nodemailer";
import { configDotenv } from 'dotenv';
// import nodemailer from 'nodemailer';

const loginUser = async (req, res) => {
  res.send("User lands on login page");
};


const CheckOTP = async(otp, res) => {

  try {
   
  const {userOTP} = req.body;
   
   if(otp === userOTP)
   {
    return {success: true}
   }
   else 
   {
    return {success: false}
   }


  } catch (error) {
    res.status(500).json({message: "Some Server error", error});
  }
   
}

const createUser = async (req, res) => {
  // try {


    try 
    {
    const {username,  email, mobnumber, password } = req.body;
    const sotp = await sendMail(email, res);

    if(sotp.success === false)
    {
       return res.status(500).json({message:"Error in Sending OTP Please try again"});
    }
    const otp = sotp.otp
    console.log("This is our otp", otp);
    const chk = otp === userOTP ? true: false;
    console.log(chk);

    if(chk)
    {
    const saltRounds = 10;
    const hashed_password = await bcrypt.hash(password, saltRounds); // Ensure await is used
    console.log('Hashed password:', hashed_password);

    const newUser = new User({
      username,
      email,
      password: hashed_password,
      mobnumber
    });

    await newUser.save()
    return res.status(200).json({message: "User Created Successfully"});
    }
    else 
    {
      return res.status(400).json({message: "Please give correct OTP"})
    }
  }
  catch(err)
  {
    res.status(500).json({message:"Some server error", err});
  }
  

  //   // Validate required fields
  //   if (!username || !password || !email) {
  //     return res.status(400).json({ message: "All three fields are required" });
  //   }

  //   // Check if the email already exists
  //   const existing_email = await User.findOne({ email });
  //   if (existing_email) {
  //     return res.status(400).json({ message: "User with this email already exists" });
  //   }

  //   const saltRounds = 10;
  //   const hashed_password = await bcrypt.hash(password, saltRounds); // Ensure await is used
  //   console.log('Hashed password:', hashed_password);

  //   const newUser = new User({
  //     username,
  //     email,
  //     password: hashed_password,
  //     mobnumber
  //   });

  //   await newUser.save()
  //   return res.status(200).json({message: "User Created Successfully"});

  // } catch (err) {
  //   console.error("Error during user creation", err);
  //   return res.status(500).json({ message: "An error occurred", error: err });
  // }
};

const sendMail = async (email, res) => {
    try {
        // const {email} = req.body;
  
        console.log("Get into try");
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, 
            auth: {
                user: `${process.env.AUTH_EMAIL}`,
                pass: `${process.env.APP_PASS}`
            }
        });
        const otp = Math.floor(Math.random()*9000 + 1000)
        console.log(otp);

        let info = await transporter.sendMail({
            from: "Cardiac App", 
            to: email, 
            subject: "Your Verification Code", 
            html: `<p>This is Your Verification code <b>${otp}</b></p>` 
        });

        console.log("Mail sent successfully");
        return { success: true, otp };

    } catch (err) {
        console.log("This is the error", err);
        return res.status(500).json({ message: "Some server error", err });
    }
};

export {
  loginUser,
  createUser,
  sendMail
};
