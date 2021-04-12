require('dotenv').config()
const Order = require('../models/order')
const jwt = require('jsonwebtoken')

exports.addOrder = async (req, res, next) => {
  const token = req.header('auth-token')
  const id_buyer = jwt.verify(token, process.env.BUYER_TOKEN)._id

  const newOrder = new Order({
    id_product: req.body.id_product,
    id_seller: req.body.id_seller,
    id_buyer: req.body.id_buyer,
    totalPrice: req.body.totalPrice,
    address: req.body.address
  })
  try {
    const order = await newOrder.save()
    res.status(201).send(order)
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}

exports.getAllOrders = async (req, res, next) => {
  try {
    // const orders = await Order.find();
    const orders = await Order.aggregate([
      // { $match: { id_buyer: mongoose.Types.ObjectId(req.params.id) } },
      {
        $lookup: {
          from: 'products',
          localField: 'id_product',
          foreignField: '_id',
          as: 'product'
        }
      },
      {
        $lookup: {
          from: 'buyer',
          localField: 'id_buyer',
          foreignField: '_id',
          as: 'buyer'
        }
      }
    ])
    res.status(200).send(orders)
  } catch (error) {
    res.status(404).send({ message: error.message })
  }
}

// exports.getAllOrders1 = async (req, res, next) => {
//   try {
//     await Order.find({}, (err, data) => {
//       if (err) return res.status(400).send(err)

//       req.firstData = data
//       next()
//     })
//   } catch {}
// }

// exports.getAllOrders = async (req, res, next) => {
//   try {
//     console.log(req.firstData)
//     await Order.find()
//       .populate('id_buyer')
//       .exec((err, data) => {
//         if (err) {
//           return res.status(400).send(err)
//         }
//         // let getAllData = req.firstData.concate(data[0].id_buyer)

//         const data1 = req.firstData
//         const data2 = data[0].id_buyer
//         let arr = []

//         let getAll = data1.concat(data2)

//         res.send(getAll)
//         //Array.prototype.push.apply(data1,data2);
//       })
//   } catch {}
// }

exports.getOrder = async (req, res, next) => {
  try {
    const order = await Order.findOne({ _id: req.params.id })
    res.status(201).send(order)
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}
