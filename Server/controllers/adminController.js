require("dotenv").config();
const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { adminValidationSchema , loginValidationSchema } = require("./validations/validationSchema");

exports.adminRegister = async (req, res, next) => {

  //VALIDATE DATA BEFORE SAVE ADMIN
  const { error } = adminValidationSchema.validate(req.body)
  if (error) return res.status(400).send(error.details[0].message);

   //CHECK IF ADMIN ALREADY EXIST
  const emailExist = await Admin.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exist");

   //HASH PASSWORD
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const admin = new Admin({
    full_name: req.body.full_name,
    email: req.body.email,
    phone: req.body.phone,
    password: hashedPassword,
    address: req.body.address,
  });

  try {
    const savedAdmin = await admin.save();
    res.send(savedAdmin);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.adminLogin = async (req, res, next) => {

  const { error } = loginValidationSchema.validate(req.body)
  if (error) return res.status(400).send(error.details[0].message);

  const admin = await Admin.findOne({ email: req.body.email });
  if (!admin) return res.status(400).send("Wrong credentials");

  const validPass = await bcrypt.compare(req.body.password, admin.password);
  if (!validPass) return res.status(400).send("Wrong credentials");

  const token = jwt.sign({ _id: admin._id, email: admin.email , superAdmin : false },process.env.ADMIN_TOKEN);
  res.header("auth-token", token).send(token);
};

exports.getAllAdmins = async (req, res, next) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.deleteAdmin = async (req, res, next) => {
  const admin = await Admin.findById({ _id: req.params.id });

  if (!admin) {
    res.status(404).send("Admin Not Found");
  }
  else{
    const deletedAdmin= await admin.deleteOne()
    res.send(deletedAdmin)
  }
};
