const router = require("express").Router();
const {
  addProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getProduct,
  getProductsByUserId,
} = require("../controllers/productController");

const { uploadImage }=require("../middleware/uploadFiles")

router.get("/getAll", getAllProducts);
router.post("/addProduct",uploadImage.array('picture',1), addProduct);
router.patch("/updateProduct/:id", updateProduct);
router.delete("/deleteProduct/:id", deleteProduct);
router.get("/getProductsByUserId/:id", getProductsByUserId);
router.get("/getProductById/:id", getProduct);
module.exports = router;
