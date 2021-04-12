const mongoose = require("mongoose");

const sellerSchema = new mongoose.Schema(
  {
    full_name: {
      type: String,
      required: true,
    },
    isValid: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
    },
    isReseted: {
      type: Boolean,
      default: false,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    turnOver: {
      type: Number,
    },
    productsCount: {
      type: Number,
    },
    identity: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("Seller", sellerSchema);
