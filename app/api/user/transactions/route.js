import { NextResponse } from "next/server"
import connect from "@/database/dbConnect"
import Transaction from "@/models/transactionsModel"
import { getDataFromToken } from "@/helpers/getDataFromToken"
import User from "@/models/userModel"
import transactionsSchema from "@/schemas/transactionsSchema"

connect()

export async function POST(request) {
  try {
    const reqBody = await request.json()
    const { amount, description, category, type, name } = reqBody

    const tokenData = getDataFromToken(request)
    if (tokenData.error) {
      throw new Error(tokenData.error)
    }

    const joiRes = transactionsSchema.validate(reqBody)
    if (joiRes.error) {
      return NextResponse.json(
        { joiError: "Validation Failed", joiRes },
        { status: 400 }
      )
    }

    const foundUser = await User.findById(tokenData.id)

    if (foundUser.categories.indexOf(category) == "-1") {
      throw new Error("Invalid Category")
    }

    const newTransaction = new Transaction({
      user_id: tokenData.id,
      name,
      amount,
      description,
      category,
      type,
    })

    await newTransaction.save()

    console.log("Transaction created")

    return NextResponse.json(
      { message: "Transaction created successfully", success: true },
      { status: 200 }
    )
  } catch (err) {
    console.log(err)
    return NextResponse.json(
      {
        message: "Error creating transaction",
        error: err.message,
        success: false,
      },
      { status: 400 }
    )
  }
}

export async function GET(request) {
  try {
    const tokenData = getDataFromToken(request)
    if (tokenData.error) {
      throw new Error(tokenData.error)
    }

    const page = request.nextUrl.searchParams.get("page")
    const limit = request.nextUrl.searchParams.get("limit")
    const dateFrom = request.nextUrl.searchParams.get("dateFrom")
    const dateTo = request.nextUrl.searchParams.get("dateTo")

    const foundTransactions = await Transaction.find({
      user_id: tokenData.id,
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
      },
      { status: 200 }
    )
  } catch (err) {
    return NextResponse.json(
      {
        message: "Error getting transaction",
        error: err.message,
        success: false,
      },
      { status: 400 }
    )
  }
}
