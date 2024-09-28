import connect from "@/database/dbConnect"
import ShareToken from "@/models/shareTokensModel"
import Transaction from "@/models/transactionsModel"
import User from "@/models/userModel"
import mongoose from "mongoose"
import { NextResponse } from "next/server"

connect()
export async function GET(request) {
  try {
    const page = request.nextUrl.searchParams.get("page")
    const limit = request.nextUrl.searchParams.get("limit")
    const t = request.nextUrl.searchParams.get("t")
    const foundToken = await ShareToken.findOne({ shareToken: t })
    if (!foundToken) {
      return NextResponse.json({ error: "Invald URL" }, { status: 400 })
    }
    const foundUser = await User.findById(foundToken.user_id)
    if (!foundUser) {
      return NextResponse.json({ error: "Invald URL" }, { status: 400 })
    }

    const foundTransactions = await Transaction.find({
      user_id: foundToken.user_id,
      dateAndTime: {
        $gte: foundToken.period.from ? foundToken.period.from : new Date(0),
        $lte: foundToken.period.to
          ? foundToken.period.to
          : new Date("9999-12-31"),
      },
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
        date: {
          from: foundToken.period.from ? foundToken.period.from : new Date(0),
          to: foundToken.period.to
            ? foundToken.period.to
            : new Date("9999-12-31"),
        },
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
