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

    console.log("still continuing")

    const newTransaction = new Transaction({
      user_id: id,
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
