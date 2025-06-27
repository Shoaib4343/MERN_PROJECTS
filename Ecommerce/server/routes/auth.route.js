const express = require("express");
const { register, login, test, forget_password } = require("../controllers/auth.controller");
const { validate } = require("../middlewares/joiValidate.middleware");
const { registerSchema, loginSchema, resetPassSchema } = require("../validator/user.validator");
const { isSignIn, isAdmin } = require("../middlewares/auth.middleware");
const route = express.Router();

// Register Route || Method Post
route.post("/register",validate(registerSchema),register)

// Login Route || Method Post
route.post("/login",validate(loginSchema),login)

// Forget Password || Method Post
route.post("/forget_password",validate(resetPassSchema),forget_password)

// user protected route
route.get("/dashbord",isSignIn,(req,res)=>{
    res.status(200).json({status : "ok"})
})


// Admin Protected Route
route.get("/admin",isSignIn,isAdmin,(req,res)=>{
    res.status(200).json({success:true,status:"OK"})
})

route.post("/test",isSignIn,isAdmin,test)


module.exports = route;