import mongoose from "mongoose"

const shareTokenSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Transaction must refer to a user"],
  },
  shareToken: {
    type: String,
    required: [true, "Share token can't be empty"],
  },
})

const ShareToken =
  mongoose.models.ShareToken || mongoose.model("ShareToken", shareTokenSchema)

export default ShareToken
