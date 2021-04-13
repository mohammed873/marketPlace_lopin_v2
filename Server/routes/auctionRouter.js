const router = require('express').Router()
const { uploadImage } = require('../middleware/uploadFiles')
const {
  addAuctionProduct,
  getAllAuctionProducts,
  deleteAuctionProduct,
  validSold,
  getProduct,
  updatePrice
} = require('../controllers/aucttinController')

router.get('/getAll', getAllAuctionProducts)
router.get('/getOne', getProduct)
router.patch('/validate', validSold)
router.patch('/updatePrice', updatePrice)
router.post('/add', uploadImage.array('picture', 1), addAuctionProduct)
router.delete('/delete/:id', deleteAuctionProduct)

module.exports = router
