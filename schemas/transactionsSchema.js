import Joi from "joi"
const transactionsSchema = Joi.object({
  name: Joi.string().required(),
  amount: Joi.number().required(),
  description: Joi.string(),
  category: Joi.string().required(),
  type: Joi.string().required(),
})

export default transactionsSchema
