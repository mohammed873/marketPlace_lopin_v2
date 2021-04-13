const mongoose = require("mongoose");

const auctionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    picture: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
    },
    sold: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Auction", auctionSchema);
