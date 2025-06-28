const mongoose = require("mongoose");

const productModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    quantity: {
      type: Number,
      required: true,
    },
    photo: {
      url: {
        type: String,
        required: true,
      },
      public_id: {
        type: String,
      },
    },

    shipping: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productModel);
