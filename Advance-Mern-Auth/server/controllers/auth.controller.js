import bcrypt from "bcryptjs";
import userModel from "../models/user.model.js";
import setAuthCookie from "../utils/setAuthCookie.js";

import { sendResetOTPEmail, sendVerifyOtpEmail, sendWelcomeEmail } from "../nodemailer/emails.js";

// Register Controller
export const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // if input is empty
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All Fields are required",
      });
    }

    // Find user With email
    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User Already Exists",
      });
    }

    // if user not exists
    const hashPass = await bcrypt.hash(password, 10);

    // add user with hashed password
    const user = await new userModel({ name, email, password: hashPass });
    await user.save();

    // create jwt token and also store it in cookie
    setAuthCookie(res, user._id);

    // Send Welcome Email
    sendWelcomeEmail(email, name);

    // res
    return res.status(201).json({
      success: true,
      message: "User Register Successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in Register Server",
      error: error.message,
    });
  }
};

// Send Verification Email
export const sendVerifyOtp = async (req, res) => {
  try {
    const { id } = req.user;
    // Find user
    const user = await userModel.findById(id);

    // is user is verified already
    if (user.isVerified) {
      return res.status(500).json({
        success: false,
        message: "User Already Verified",
      });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));
    const otpExpiredAt = Date.now() + 15 * 60 * 1000;

    user.verifyOtp = otp;
    user.verifyOtpExpiredAt = otpExpiredAt;
    await user.save();

    sendVerifyOtpEmail(user.email, otp);

    res.status(200).json({
      success: true,
      message: "Opt email is send successfully",
    });
  } catch (error) {
    console.log("Error in sendVerifyOtp controller", error.message);
    res.status(500).json({
      success: false,
      message: "Error in sendVerifyOtp controller",
      error: error.message,
    });
  }
};

// Verify Otp
export const verifyotp = async (req, res) => {
  // Extract data from req.body
  const { otp } = req.body;
  const { id } = req.user;
  if (!id || !otp) {
    return res.json({
      success: false,
      message: "Missing Details",
    });
  }

  try {
    // find user
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    // Check Verify OPT
    if (user.verifyOtp === "" || user.verifyOtp !== otp) {
      return res.status(401).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // Check Verify expire Date
    if (user.verifyOtpExpiredAt < Date.now()) {
      return res.status(401).json({
        success: false,
        message: "OTP Expired",
      });
    }

    // save user with new data
    user.isVerified = true;
    user.verifyOtp = "";
    user.verifyOtpExpiredAt = 0;
    await user.save();

    // return responce
    return res.status(200).json({
      success: true,
      message: "OTP Verify Successfully",
    });
  } catch (error) {
    console.log("error in verify otp controller : ", error.message);
    res.status(500).json({
      success: false,
      message: "Error in Veriy Otp ",
      error: error.message,
    });
  }
};

// Login Controller
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // All fields are required
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All Fields Are Required",
      });
    }

    // Check Email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Email Credintils Error",
      });
    }

    // if email is not match
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Email Credintils Error",
      });
    }

    // create jwt token and also store it in cookie
    setAuthCookie(res, user._id);

    return res.status(200).json({
      success: true,
      message: "User login Successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("error : ", error.message);
    return res.status(500).json({
      success: false,
      message: "Error in Login Server ",
    });
  }
};

// LogOut Controller
export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.DEV_MODE === "production",
      sameSite: process.env.DEV_MODE === "production" ? "strict" : "lax",
    });

    return res.status(200).json({
      success: true,
      message: "User LogOut Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in LogOut Server",
    });
  }
};

// isAuthenticated
export const isAuthenticated = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "user is authenticated",
      user: req.user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User is Not Authenticated",
    });
  }
};

// Send Reset OTP
export const sendResetOTP = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(401).json({
      success: false,
      message: "Email is required",
    });
  }

  try {
    // Find User with email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User Not Found",
      });
    };

    // Generate Random 6 digit String Otp
    const otp =  Math.round(100000 + Math.random() * 900000).toString();

    // Save User
    user.resetOtp = otp;
    user.resetOtpExpiredAt = Date.now() + 15 * 60 * 1000;
    await user.save();

    // Send email 
    sendResetOTPEmail(email,otp);

    res.status(200).json({
      success: true,
      message: "Reset otp email is send succcessfully"
    })




  } catch (error) {
    console.log("Error in Send Email OTP controller : ", error.message);
    res.status(500).json({
      success: false,
      message: "Error in Send Email OTP controller",
      error: error.message,
    });
  }
};


// reset Password
export const resetPassword = async(req,res)=>{
  const {email,otp,password} = req.body;
  if(!email || !otp || !password){
    return res.status(401).json({
      success: false,
      message: "All Fields Are Required"
    })
  };

  try {

    // find user
    const user = await userModel.findOne({email});
    if(!user){
      return res.status(401).json({
        success: false,
        message: "User not found"
      })
    };


    // if opt is not mathc 
    if(user.resetOtp !== otp){
      return res.status(401).json({
        success: false,
        message: "Invalid OTP"
      })
    };

    // if OTP is expired
    if(user.resetOtpExpiredAt < Date.now()){
      return res.status(401).json({
        success: false,
        message: "OTP is expired"
      })
    };

    // hased new password
    const hashedPass =await bcrypt.hash(password,10);

    // save user
    user.password = hashedPass;
    user.resetOtp = '',
    user.resetOtpExpiredAt = 0;

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password Reset Successfully'
    });

    
  } catch (error) {
    console.log('Error in reset password controller : ', error.message);
    res.status(500).json({
      success: false,
      message: "Error in Reset Password controller ",
      error: error.message
    })
  }
}
