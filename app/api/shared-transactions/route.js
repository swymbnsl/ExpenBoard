import connect from "@/database/dbConnect"
import Transaction from "@/models/transactionsModel"
import User from "@/models/userModel"
import mongoose from "mongoose"
import { NextResponse } from "next/server"

connect()
export async function GET(request) {
  try {
    const page = request.nextUrl.searchParams.get("page")
    const limit = request.nextUrl.searchParams.get("limit")
    const dateFrom = request.nextUrl.searchParams.get("s")
    const dateTo = request.nextUrl.searchParams.get("e")
    const userId = request.nextUrl.searchParams.get("u")

    const areValidDates = !isNaN(new Date(dateFrom)) && !isNaN(new Date(dateTo))

    if (!mongoose.isValidObjectId(userId) || !areValidDates)
      return NextResponse.json({ error: "Invalid URL" }, { status: 400 })

    const foundUser = await User.findOne({ _id: userId })
    if (!foundUser) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      )
    }

    const foundTransactions = await Transaction.find({
      user_id: userId,
      dateAndTime: { $gte: dateFrom, $lte: dateTo },
    })
      .skip((page - 1) * limit)
      .limit(limit)

    return NextResponse.json(
      {
        message: "Transactions queried successfully",
        success: true,
        totalTransactions: foundTransactions.length,
        totalPages: Math.ceil(foundTransactions.length / limit),
        currentPage: page,
        transactions: foundTransactions,
        name: foundUser.name,
        currency: foundUser.preferences.currency,
      },
      { status: 200 }
    )
  } catch (err) {
    return NextResponse.json(
      {
        error: "Error getting shared data",
        err: err.message,
        success: false,
      },
      { status: 400 }
    )
  }
}
