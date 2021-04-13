require('dotenv').config()
const Auction = require('../models/auction')

exports.addAuctionProduct = async (req, res, next) => {
  const newAuction = new Auction({
    name: req.body.name,
    description: req.body.description,
    sold: false,
    price: req.body.price,
    picture: req.files[0].filename
  })
  try {
    const auction = await newAuction.save()
    res.status(201).send(' Auction Product Added !')
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}

exports.getAllAuctionProducts = async (req, res, next) => {
  try {
    const products = await Auction.find()
    res.status(200).send(products)
  } catch (error) {
    res.status(404).send({ message: error.message })
  }
}

exports.deleteAuctionProduct = async (req, res, next) => {
  try {
    const deletedProduct = await Auction.deleteOne({ _id: req.params.id })
    res.status(201).send(deletedProduct)
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}

exports.validSold = async (req, res, next) => {
  const AuctionProduct_id = req.body.AuctionProduct_id

  const AuctionProduct = await Auction.findById({ _id: AuctionProduct_id })
  res.send(AuctionProduct)
  if (!AuctionProduct) {
    res.status(404).send({ message: 'AuctionProduct not found' })
  } else {
    AuctionProduct.sold = true
    const validsold = await AuctionProduct.save()
    res.status(201).send(validsold)
  }
}

exports.updatePrice = async (req, res, next) => {
  const AuctionProduct_id = req.body.AuctionProduct_id
  const newPrice = req.body.price
  const AuctionProduct = await Auction.findById({ _id: AuctionProduct_id })
  res.send(AuctionProduct)
  if (!AuctionProduct) {
    res.status(404).send({ message: 'AuctionProduct not found' })
  } else {
    AuctionProduct.price = newPrice
    const validsold = await AuctionProduct.save()
    res.status(201).send(validsold)
  }
}

exports.getProduct = async (req, res, next) => {
  try {
    const auctionProduct = await Auction.findOne({ _id: req.params.id });
    res.status(201).send(auctionProduct);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};