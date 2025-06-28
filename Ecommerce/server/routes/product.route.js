const express = require("express");
const { isSignIn, isAdmin } = require("../middlewares/auth.middleware");
const {
  createProductController,
  getProductsController,
  getProductController,
  getProductPhotoController,
  productDeleteController,
} = require("../controllers/product.controller");
const upload = require("../middlewares/multer.middleware");
const { validate } = require("../middlewares/joiValidate.middleware");
const { productValidatorSchema } = require("../validator/product.validator");
const checkFile = require("../middlewares/checkFile.middleware");
const route = express.Router();

// CREATE PRODUCT || METHOD POST
route.post(
  "/create-product",
  isSignIn,
  isAdmin,
  upload.single("photo"),
  checkFile('photo'),
  validate(productValidatorSchema),
  createProductController
);

//  GET ALL PRODUCTS || METHOD GET
route.get("/get-products",getProductsController)

// GET SINGLE PRODUCT || METHOD GET
route.get("/get-product/:id",getProductController)

// GET SINGLE PRODUCT PHOTO || METHOD GET
route.get("/get-product-photo/:id",getProductPhotoController)

// DELETE PRODUCT || METHOD DELETE
route.delete("/product/:id",productDeleteController)
module.exports = route;
