const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    id_category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categories",
    },
    id_seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "sellers",
    },
    picture: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
