import Joi from "joi"
const transactionsSchema = Joi.object({
  name: Joi.string().required(),
  amount: Joi.number().required(),
  category: Joi.string().required(),
  type: Joi.string().required(),
  dateAndTime: Joi.date().required(),
})

export default transactionsSchema
