const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

// require SignIn
const isSignIn = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "No Token Found in Request",
      });
    }

    let decoded = jwt.verify(token, process.env.SEKRET_KEY);
    if(!decoded){
        return res.status(500).json({
            success: false,
            message: "Error in Verifing the Token of isSignIn"
        })
    }

     // Attach decoded info to request for use in next handlers
    req.user = decoded;

    
    next();
  } catch (error) {
    console.log('error : ', error.message)
    res.status(500).json({
        success:false,
        message: "Error in isSignIn Token...",
        error: error.message
    })
  }
};

// require admin || adming middleware
const isAdmin = async (req,res,next)=>{
    try {
        const user = await userModel.findById(req.user._id);
        if(!user){
            return res.status(500).json({
                success: false,
                message: "User Not Found",
            })
        }

        if(user.role !== 1){
            return res.status(500).json({
                success: false,
                message: "Not Authorized"
            })
        }

        next();

    } catch (error) {
        console.log('error:',error.message);
        res.status(500).json({
            success: false,
            message: 'Error in Admin Middleware',
            error: error.message
        })
    }
}


module.exports = {  isSignIn, isAdmin };
