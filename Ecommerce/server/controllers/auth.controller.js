const userModel = require("../models/user.model");
const { hashPass, comparePass } = require("../utils/auth.utils");
const jwt = require('jsonwebtoken')


// register controller
const register = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    // check User
    const checkUser = await userModel.findOne({ email });
    if (checkUser) {
      return res.status(409).send({
        success: false,
        message: "Already Register Please Login",
      });
    }

    // register User
    const userHashedPass = await hashPass(password);
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: userHashedPass,
    }).save();

    res.status(200).send({
      success: true,
      message: "User Register Successfuly...",
      user,
    });
  } catch (error) {
    console.log("error : ", error.message);
    res.status(500).send({
      success: false,
      message: "something wend wrong in registeration",
      error,
    });
  }
};

// login controller

const login = async(req,res)=>{

  try {
    let {email,password} = req.body;
    // check user
    const user = await userModel.findOne({email});
    if(!user){
      return res.status(400).json({
        success: false,
        message: 'Email Something went wrong...'
      })
    }

    // compare password
    let check = comparePass(password,user.password);
    if(!check){
      return res.status(400).status({
        success: false,
        message: "Password Something Wend wrong..."
      })
    }

    let token = jwt.sign({_id:user._id,emial:user.email},process.env.SEKRET_KEY,{expiresIn:"1h"})

    res.status(200).json({
      message: "Login Successfully...",
      token,
      user:{
        _id: user._id,
        email: user.email,
        name: user.name
      }
    })



  } catch (error) {
    console.log(`error : ${error.message}`);
    res.status(400).json({
      success: false,
      message: "Login Error",
      error
    })

  }
}

// test controler
const test = (req,res)=>{
  res.status(200).json({
    success: true,
    message: 'test is working,,,,.....'
  })
}


module.exports = { register,login,test };
