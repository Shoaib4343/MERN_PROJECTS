const { default: slugify } = require("slugify");
const productModel = require("../models/product.model");
const uploadOnCloudinary = require("../utils/cloudinary.utls");

// CREATE PRODUCT CONTROLLER
const createProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.body;

    // console.log("Uploaded File:", req.file);
    // console.log("Cloudinary Config:", {
    //   name: process.env.CLOUDINARY_NAME,
    //   key: process.env.CLOUDINARY_NAME_KEY,
    //   secret: process.env.CLOUDINARY_NAME_API_SECRET,
    // });

    // Upload photo using Cloudinary
    const localeFilePath = req.file?.path;
    const cloudinaryResult = await uploadOnCloudinary(localeFilePath);

    if (!cloudinaryResult) {
      return res.status(400).json({ message: "Image upload failed" });
    }

    const product = await productModel.create({
      name,
      slug: slugify(name),
      description,
      price,
      category,
      quantity,
      shipping,
      photo: {
        url: cloudinaryResult.secure_url,
        public_id: cloudinaryResult.public_id,
      },
    });

    // Send response
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in Creating Product",
      error: error.message,
    });
  }
};

// GET PRODUCTS
const getProductsController = async (req, res) => {
  try {
    const products = await productModel
      .find()
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: "Get All Products Succesfully",
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in Getting All Products",
      error: error.message,
    });
  }
};

// GET  SINGLE PRODUCT
const getProductController = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModel
      .findById(id)
      .populate("category")
      .select("-photo");
    res.status(200).json({
      success: true,
      message: "Single Product access successfully.",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in Geting Single Product",
      error: error.message,
    });
  }
};

// GET  SINGLE PRODUCT photo
const getProductPhotoController = async (req, res) => {
  try {
    const { id } = req.params;
    const productPhoto = await productModel
      .findById(id)
      .select("photo");
    res.status(200).json({
      success: true,
      message: "Single Product access successfully.",
      productPhoto: productPhoto.photo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in Geting Single Product",
      error: error.message,
    });
  }
};

// DELETE PRODUCT
const productDeleteController = async (req, res) => {
  try {
    const {id} = req.params;
    await productModel.findByIdAndDelete(id).select("-photo")
    res.status(200).json({
      success: true,
      message: " Product Deleted successfully.",
      
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error Whilte Delete Product",
      error: error.message,
    });
  }
};


module.exports = {
  createProductController,
  getProductsController,
  getProductController,
  getProductPhotoController,
  productDeleteController
};
