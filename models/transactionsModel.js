import mongoose from "mongoose"

const categories = []

const transactionsSchema = new mongoose.Schema({
  user_id: {
    type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    required: [true, "Transaction must refer to a user"],
  },
  amount: {
    type: Number,
    required: [true, "Please provide the transaction amount"],
  },
  description: {
    type: String,
  },
  category: {
    type: String,
    enum: {
      values: categories,
      message: "Invalid transaction category",
    },
  },
  dateAndTime: {
    type: Date,
    default: Date.now(),
  },
  type: {
    type: String,
    enum: {
      values: ["expense", "income"],
      message: "Invalid transaction type",
    },
  },
})

const Transaction =
  mongoose.models.Transaction ||
  mongoose.model("Transaction", transactionsSchema)

export default Transaction
