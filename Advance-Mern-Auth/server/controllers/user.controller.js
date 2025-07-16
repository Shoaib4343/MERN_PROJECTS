import userModel from "../models/user.model.js";

export const getUserData = async (req, res) => {
  const { id } = req.user;
  try {
    // find user
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User Not Found Please Login",
      });
    }

    res.status(200).json({
      success: true,
      userData: {
        name: user.name,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    console.log("Error while getting user data", error.message);
    return res.status(500).json({
      success: false,
      message: "Error while getting User data ",
      error: error.message,
    });
  }
};
