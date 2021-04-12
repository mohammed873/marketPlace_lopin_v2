const router = require("express").Router();
const { deliveryManAdd, getAllDeliveryMen, deleteDeliveryMen } = require("../controllers/deliveryMan");

router.post("/add", deliveryManAdd);
router.get("/getAll", getAllDeliveryMen);
router.delete('/delete/:id',deleteDeliveryMen)

module.exports = router;
