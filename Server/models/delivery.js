const mongoose = require("mongoose");

const deliverySchema = new mongoose.Schema(
  {
    id_order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "orders",
    },
    id_DeliveryMan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "delivryman",
    },
    delivery_date: {
      type: Date,
      required: true,
    },
    delivery_type: {
      type: String,
    },
    delivery_price: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Delivery", deliverySchema);
