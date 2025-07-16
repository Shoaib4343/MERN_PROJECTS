import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  try {
    // get token from cookies
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not Authorize Please Login Again",
      });
    }
    // decode toen 
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if(!decode){
       return res.status(401).json({
        success: false,
        message: "Invalid token. Please log in again.",
      });
    }

    // store in req.body.userId
    req.user= decode;
    next()
  } catch (error) {
    console.log("error in userAuth middleware :", error.message);
    res.status(500).json({
      success: false,
      message: "Error in userAuth middleware",
      error: error.message,
    });
  }
};

export default userAuth;
