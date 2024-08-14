import Joi from "joi"
const userSchema = Joi.object({
  name: Joi.string().required(),

  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": `Invalid email address`,
    }),

  password: Joi.string().min(6).messages({
    "string.min": `Password must be atleast 6 characters long`,
  }),
})

export default userSchema
