import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import connect from "@/database/dbConnect"
import Transaction from "@/models/transactionsModel"
import { getDataFromToken } from "@/helpers/getDataFromToken"

connect()

export async function POST(request) {
  try {
    const reqBody = await request.json()
    const { amount, description, category, type } = reqBody

    const tokenData = getDataFromToken(request)
    if (tokenData.error) {
      throw new Error(tokenData.error)
    }

    const newTransaction = new Transaction({
      user_id: tokenData.id,
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

    const foundTransactions = await Transaction.find({
      user_id: tokenData.id,
    })

    console.log(foundTransactions)

    return NextResponse.json(
      { message: "Transactions queried successfully", success: true },
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
