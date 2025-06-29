const categoryModel = require("../models/category.model");
const slugify = require("slugify");

// CREATE CATEGORY CONTROLLER
const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const checkCategory = await categoryModel.findOne({ name });
    if (checkCategory) {
      return res.status(500).json({
        success: false,
        message: "Category Already Exists...",
      });
    }

    const category = await new categoryModel({
      name,
      slug: slugify(name),
    }).save();
    res.status(201).json({
      success: true,
      message: "New Category Created Successfully",
      category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wrong in category",
      error: error.message,
    });
  }
};

// UPDATE CATEGORY CONTROLLER
const updateCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const category = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Category Update Successfully..",
      category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in Update Category",
      error: error.message,
    });
  }
};

// GET ALL CATEGORIES CONTROLLER
const getAllCategoriesController = async (req, res) => {
  try {
    const categories = await categoryModel.find();
    res.status(200).json({
      success: true,
      message: "Geting All Categories",
      categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in GET ALL CATEGORIES",
      error: error.message,
    });
  }
};

// GET SINGLE CATEGORY CONTROLLER
const getSingleCategory = async (req, res) => {
  try {
    const { slug } = req.params;
    const category = await categoryModel.findOne({ slug });
    res.status(200).json({
      success: true,
      message: "Get Single Category Successfully..",
      category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in Geting Single Category",
      error: error.message,
    });
  }
};

// DELETE SINGLE CATEGORY CONTROLLER
const deleteSingleCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await categoryModel.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Category Deleted Successfully..",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in Deleting Single Category",
      error: error.message,
    });
  }
};

module.exports = {
  createCategoryController,
  updateCategoryController,
  getAllCategoriesController,
  getSingleCategory,
  deleteSingleCategory,
};
