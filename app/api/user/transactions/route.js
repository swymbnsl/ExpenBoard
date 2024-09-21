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
    const { amount, category, type, name, dateAndTime } = reqBody

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

    if (
      type === "expense" &&
      foundUser.expensesCategories.indexOf(category) == "-1"
    ) {
      const newExpenseCategories = [...foundUser.expensesCategories, category]
      await User.findByIdAndUpdate(tokenData.id, {
        expensesCategories: newExpenseCategories,
      })
    } else if (
      type === "income" &&
      foundUser.incomeCategories.indexOf(category) == "-1"
    ) {
      const newIncomeCategories = [...foundUser.incomeCategories, category]
      await User.findByIdAndUpdate(tokenData.id, {
        incomeCategories: newIncomeCategories,
      })
    }

    const newTransaction = new Transaction({
      user_id: tokenData.id,
      name,
      amount,
      category,
      type,
      dateAndTime,
    })

    await newTransaction.save()

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

export async function DELETE(request) {
  try {
    const id = request.nextUrl.searchParams.get("id")
    const deleteRes = await Transaction.findByIdAndDelete(id)
    return NextResponse.json(
      {
        message: "Transaction Deleted successfully",
        success: true,
        deleteRes,
      },
      { status: 200 }
    )
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      {
        message: "Error deleting transaction",
        error: error.message,
        success: false,
      },
      { status: 400 }
    )
  }
}

export async function PATCH(request) {
  try {
    const reqBody = await request.json()
    const { id, amount, category, type, name, dateAndTime } = reqBody

    const tokenData = getDataFromToken(request)
    if (tokenData.error) {
      throw new Error(tokenData.error)
    }

    const tempReqBody = { ...reqBody }
    delete tempReqBody.id

    const joiRes = transactionsSchema.validate(tempReqBody)
    if (joiRes.error) {
      return NextResponse.json(
        { joiError: "Validation Failed", joiRes },
        { status: 400 }
      )
    }

    const foundUser = await User.findById(tokenData.id)

    if (
      type === "expense" &&
      foundUser.expensesCategories.indexOf(category) == "-1"
    ) {
      const newExpenseCategories = [...foundUser.expensesCategories, category]
      await User.findByIdAndUpdate(tokenData.id, {
        expensesCategories: newExpenseCategories,
      })
    } else if (
      type === "income" &&
      foundUser.incomeCategories.indexOf(category) == "-1"
    ) {
      const newIncomeCategories = [...foundUser.incomeCategories, category]
      await User.findByIdAndUpdate(tokenData.id, {
        incomeCategories: newIncomeCategories,
      })
    }

    const res = await Transaction.findByIdAndUpdate(id, {
      name,
      amount,
      category,
      type,
      dateAndTime,
    })

    return NextResponse.json(
      { message: "Transaction Updated successfully", success: true },
      { status: 200 }
    )
  } catch (err) {
    console.log(err)
    return NextResponse.json(
      {
        message: "Error Updating transaction",
        error: err.message,
        success: false,
      },
      { status: 400 }
    )
  }
}
