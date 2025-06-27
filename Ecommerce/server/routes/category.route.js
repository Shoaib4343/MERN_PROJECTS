const express = require("express");
const { isSignIn, isAdmin } = require("../middlewares/auth.middleware");
const { validate } = require("../middlewares/joiValidate.middleware");
const { categoryValidateSchema } = require("../validator/category.validator");
const {
  createCategoryController,
  updateCategoryController,
  getAllCategoriesController,
  getSingleCategory,
  deleteSingleCategory,
} = require("../controllers/categroy.controller");
const route = express.Router();

// CREATE CATEGORY ROUTE || METHOD POST
route.post(
  "/create-category",
  isSignIn,
  isAdmin,
  validate(categoryValidateSchema),
  createCategoryController
);

// UPDATE CATEGORY || METHOD POST
route.post("/update-category/:id", isSignIn, isAdmin, updateCategoryController);

// GET ALL CATEGORIES || METHOD GET
route.get("/get-categories", getAllCategoriesController);

// GET SINGLE CATEGROY || METHOD GET
route.get("/get-category/:slug", getSingleCategory);

// DELETE SINGLE CATEGORY || METHOD DELETE
route.delete("/delete-category/:id", isSignIn, isAdmin, deleteSingleCategory);

module.exports = route;
