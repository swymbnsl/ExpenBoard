import { NextResponse } from "next/server"
import connect from "@/database/dbConnect"
import { getDataFromToken } from "@/helpers/getDataFromToken"
import User from "@/models/userModel"
import Transaction from "@/models/transactionsModel"

connect()

export async function GET(request) {
  const tokenData = getDataFromToken(request)
  if (tokenData.error) {
    throw new Error(tokenData.error)
  }
  const foundUser = await User.findById(tokenData.id)
  return NextResponse.json(
    {
      message: "Categories fetched successfully",
      success: true,
      incomeCategories: foundUser.incomeCategories,
      expensesCategories: foundUser.expensesCategories,
    },
    { status: 200 }
  )
}

export async function DELETE(request) {
  try {
    const deleteCategory = request.nextUrl.searchParams.get("deleteCategory")
    const categoryType = request.nextUrl.searchParams.get("categoryType")

    const tokenData = getDataFromToken(request)
    if (tokenData.error) {
      throw new Error(tokenData.error)
    }

    const foundUser = await User.findById(tokenData.id)

    await Transaction.updateMany(
      {
        user_id: tokenData.id,
        type: categoryType,
        category: deleteCategory,
      },
      {
        category: "Uncategorized",
      }
    )

    const oldCategories =
      categoryType === "income"
        ? [...foundUser.incomeCategories]
        : [...foundUser.expensesCategories]

    const newCategories = oldCategories.filter((c) => c !== deleteCategory)

    const updateData =
      categoryType === "income"
        ? { incomeCategories: newCategories }
        : { expensesCategories: newCategories }

    console.log("Update data: ", updateData)

    const res = await User.findByIdAndUpdate(tokenData.id, updateData, {
      new: true,
    })

    console.log(res)

    return NextResponse.json(
      {
        message: `${
          categoryType[0].toUpperCase() +
          categoryType.slice(1, categoryType.length)
        } categories updated successfully`,
        success: true,
      },
      { status: 200 }
    )
  } catch (err) {
    console.log(err)
    return NextResponse.json(
      {
        message: `Error updateing ${categoryType} categories`,
        error: err.message,
        success: false,
      },
      { status: 400 }
    )
  }
}
