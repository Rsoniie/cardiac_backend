import express from "express";
import { Router } from "express";
import { loginUser, createUser, sendMail } from "../controllers/user.controller.js";


const router = Router();

router.route('/create').post(createUser);
router.route('/login').post(loginUser);
// router.route('/send').post(sendMail);


export default router;