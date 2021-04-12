require('dotenv').config()
const DeliveryMan = require('../models/deliveryMan')
const {
  deliveryManValidationSchema
} = require('./validations/validationSchema')

exports.deliveryManAdd = async (req, res, next) => {
  // VALIDATE DATA BEFORE SAVE DATA
  const { error } = deliveryManValidationSchema.validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  // CHECK IF DELEVERYMAN ALREADY EXIST
  const emailExist = await DeliveryMan.findOne({ email: req.body.email })
  if (emailExist) return res.status(400).send('Email already exist')

  const deliveryMan = new DeliveryMan({
    full_name: req.body.full_name,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address
  })

  try {
    const savedDeliveryMan = await deliveryMan.save()
    res.send(savedDeliveryMan)
  } catch (error) {
    res.status(400).send(error)
  }
}

exports.getAllDeliveryMen = async (req, res, next) => {
  try {
    const deliveryMen = await DeliveryMan.find()
    res.json(deliveryMen)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.deleteDeliveryMen = async (req, res, next) => {
  const deliveryMan = await DeliveryMan.findById({ _id: req.params.id })

  if (!deliveryMan) {
    res.status(404).send('Delivery man Not Found')
  } else {
    const deletedDeliveryMan = await deliveryMan.deleteOne()
    res.send(deletedDeliveryMan)
  }
}
