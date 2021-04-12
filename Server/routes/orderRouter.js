const router = require("express").Router();
const { addOrder, getAllOrders, getAllOrders1, getOrder } = require("../controllers/orderController");

router.post("/add", addOrder);
router.get("/getAll",  getAllOrders);
router.get('/:id',getOrder)

module.exports = router;
