const Joi = require("joi")


// register scheam
const registerSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(30).required(),
    phone: Joi.string().min(11).max(15).required(),
    address: Joi.string().min(5).required(),
    answer: Joi.string().min(5).max(30).required(),
    role: Joi.number().valid(0,1).optional()

});


// login schema 
const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(30).required(),
})



// password reset schema 
const resetPassSchema = Joi.object({
    email: Joi.string().email().required(),
    answer: Joi.string().min(3).max(30).required(),
    new_password: Joi.string().min(8).max(30).required(),
})
module.exports = {registerSchema, loginSchema,resetPassSchema};


