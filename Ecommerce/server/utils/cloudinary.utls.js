const cloudinary = require("cloudinary").v2;
const fs = require("fs");
require("dotenv").config(); 

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_NAME_KEY,
  api_secret: process.env.CLOUDINARY_NAME_API_SECRET,
});

// Upload on Cloudinary
const uploadOnCloudinary = async (localeFilePath) => {
  try {
    if (!localeFilePath) return null;

    // upload the file on cloudinary
    const uploadResult = await cloudinary.uploader.upload(localeFilePath, {
      resource_type: "auto",
    });

    // remove Temporary file
    fs.unlinkSync(localeFilePath);

    // file has been uploaded successfully...
    console.log(
      "File is Uploaded on Cloudinary Successfully..",
      uploadResult.url
    );
    return uploadResult;
  } 
  catch (error) {
    console.error("Cloudinary Upload Error:", error.message);
    if (fs.existsSync(localeFilePath)) {
      fs.unlinkSync(localeFilePath);
      // remove the localy save temporay save file
    }
    return null;
  }
};

module.exports = uploadOnCloudinary;