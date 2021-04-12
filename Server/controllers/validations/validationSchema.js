const Joi = require('joi')

exports.adminValidationSchema = Joi.object({
  full_name: Joi.string().min(6).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(10).max(14).required(),
  password: Joi.string().min(6).required(),
  address: Joi.string().required(),
})

exports.sellerValidationSchema = Joi.object({
  full_name: Joi.string().min(6).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(10).max(14).required(),
  password: Joi.string().min(6).required(),
  address: Joi.string().required(),
  identity: Joi.string().required(),
})

exports.buyerValidationSchema = Joi.object({
  full_name: Joi.string().min(6).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(10).max(14).required(),
  password: Joi.string().min(6).required(),
  address: Joi.string().required(),
})

exports.loginValidationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
})

exports.superAdminValidationSchema = Joi.object({
  full_name: Joi.string().min(6).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(10).max(14).required(),
  password: Joi.string().min(6).required(),
})

exports.deliveryManValidationSchema = Joi.object({
  full_name: Joi.string().min(6).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(10).max(14).required(),
  address: Joi.string().required(),
})
