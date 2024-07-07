import { categoriesNames } from "@/enums/categories-enum"
import { currencyCodes } from "@/enums/currencies-enum"
import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  pfp: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

  categories: {
    type: [String],
    required: true,
    default: categoriesNames,
  },

  preferences: {
    currency: {
      type: String,
      enum: currencyCodes,
      default: "INR",
    },
  },

  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
})

const User = mongoose.models.User || mongoose.model("User", userSchema)

export default User
