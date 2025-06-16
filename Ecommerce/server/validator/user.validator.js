const Joi = require("joi")

const registerSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(30).required(),
    phone: Joi.string().min(11).max(15).required(),
    address: Joi.string().min(5).required(),
    role: Joi.number().valid(0,1).optional()

});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(30).required(),
})

module.exports = {registerSchema, loginSchema};