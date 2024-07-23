import mongoose from "mongoose"

const transactionsSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Transaction must refer to a user"],
  },
  name: {
    type: String,
    required: [true, "Please provide a transaction name"],
  },
  amount: {
    type: Number,
    required: [true, "Please provide the transaction amount"],
  },

  category: {
    type: String,
    required: [true, "Please provide a transaction category"],
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
