const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema(
  {
    id_product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'products'
    },
    id_seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'sellers'
    },
    id_buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Buyer'
    },
    totalPrice: {
      type: String,
      required: true
    },
    address: {
      type: String
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Order', orderSchema, 'order')
