const router = require("express").Router();
const {
  buyerRegister,
  buyerLogin,
  validBuyer,
  getAllBuyers,
  deleteBuyer,
} = require("../controllers/buyerController");

router.post("/register", buyerRegister);
router.post("/login", buyerLogin);
router.get('/validation/:token',validBuyer)
router.get("/getAll", getAllBuyers);
router.delete("/delete/:id", deleteBuyer);
module.exports = router;
