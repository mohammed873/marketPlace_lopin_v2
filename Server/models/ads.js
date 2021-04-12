const mongoose = require("mongoose");

const adsSchema = new mongoose.Schema(
  {
    picture: {
      type: String,
      required: true,
    },
    pricing: {
      type: Number,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Ads", adsSchema);
