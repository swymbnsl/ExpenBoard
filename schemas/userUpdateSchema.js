import Joi from "joi"
const userUpdateSchema = Joi.object({
  name: Joi.string().required(),

  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": `Invalid email address`,
    }),

  pfp: Joi.string(),
  currency: Joi.string().required(),
})

export default userUpdateSchema
