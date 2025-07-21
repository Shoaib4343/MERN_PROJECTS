import express from "express";
import {
  isAuthenticated,
  login,
  logout,
  register,
  resetPassword,
  sendResetOTP,
  sendVerifyOtp,
  verifyotp,
} from "../controllers/auth.controller.js";
import userAuth from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/register", register);        // Rigester Router || Method Post
router.post("/login", login);             // LogIn Router || Method Post
router.post("/logout", logout);          // LogOut Router || Method Post

router.post("/send-verify-otp",userAuth, sendVerifyOtp);          // sending email verification OTP
router.post("/verify-otp", userAuth, verifyotp);                  //  verify OTP
router.get("/is-auth",userAuth,isAuthenticated)

router.post("/send-reset-otp",sendResetOTP);                  // Send reset otp 
router.post("/reset-password",resetPassword);                  // Send reset otp 

export default router;
