const express = require("express");
const { register, login, test } = require("../controllers/auth.controller");
const { validate } = require("../middlewares/userValidate.middleware");
const { registerSchema, loginSchema } = require("../validator/user.validator");
const { isSignIn, isAdmin } = require("../middlewares/auth.middleware");
const route = express.Router();

// Register Route || Method Post
route.post("/register",validate(registerSchema),register)

// Login Route || Method Post
route.post("/login",validate(loginSchema),login)

// user protected route
route.get("/dashbord",isSignIn,(req,res)=>{
    res.status(200).json({status : "ok"})
})

route.post("/test",isSignIn,isAdmin,test)


module.exports = route;