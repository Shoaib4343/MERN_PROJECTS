const Joi = require("joi");

const productValidatorSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(10).required(),
  price: Joi.number().min(0).required(),
  category: Joi.string().required(), // Assuming it's ObjectId as string
  quantity: Joi.number().min(0).required(),
  shipping: Joi.boolean().required(),
});

module.exports = { productValidatorSchema };
