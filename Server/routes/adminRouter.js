const router = require("express").Router();
const { adminRegister, adminLogin, getAllAdmins,deleteAdmin } = require("../controllers/adminController");
const { verifySuperAdminToken } = require("../controllers/tokenVerfication/verifyToken")

router.post("/add", adminRegister);
router.post("/login", adminLogin);
router.get("/getAll", getAllAdmins);
router.delete('/deleteAdmin/:id',deleteAdmin)

module.exports = router;
