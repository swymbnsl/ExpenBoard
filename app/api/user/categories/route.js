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
      categoryType == "income"
        ? [...foundUser.incomeCategories]
        : [...foundUser.expensesCategories]

    const newCategories = oldCategories.filter((c) => c !== deleteCategory)

    const updateData =
      categoryType == "income"
        ? { incomeCategories: newCategories }
        : { expensesCategories: newCategories }

    const res = await User.findByIdAndUpdate(tokenData.id, updateData, {
      new: true,
    })

    return NextResponse.json(
      {
        message: `${
          categoryType[0].toUpperCase() +
          categoryType.slice(1, categoryType.length)
        } categories deleted successfully`,
        success: true,
      },
      { status: 200 }
    )
  } catch (err) {
    console.log(err)
    return NextResponse.json(
      {
        message: `Error deleting ${categoryType} categories`,
        error: err.message,
        success: false,
      },
      { status: 400 }
    )
  }
}

export async function PATCH(request) {
  try {
    const reqBody = await request.json()
    const { name, type, newName } = reqBody

    const tokenData = getDataFromToken(request)
    if (tokenData.error) {
      throw new Error(tokenData.error)
    }

    if (newName.length == 0)
      return NextResponse.json(
        {
          validationError: "Validation Failed",
          errorHelperText: "Category name can't be empty",
        },
        { status: 400 }
      )

    const foundUser = await User.findById(tokenData.id)

    const categories =
      type == "income"
        ? [...foundUser.incomeCategories]
        : [...foundUser.expensesCategories]

    if (categories.indexOf(name) == -1) {
      return NextResponse.json(
        {
          error: "Category does'nt exist, hence can't be updated",
          success: false,
        },
        { status: 400 }
      )
    }
    await Transaction.updateMany(
      {
        user_id: tokenData.id,
        type: type,
        category: name,
      },
      {
        category: newName,
      }
    )

    const oldCategories =
      type == "income"
        ? [...foundUser.incomeCategories]
        : [...foundUser.expensesCategories]

    const newCategories = oldCategories.map((c) => {
      if (c === name) return newName
      return c
    })

    const updateData =
      type == "income"
        ? { incomeCategories: newCategories }
        : { expensesCategories: newCategories }

    const res = await User.findByIdAndUpdate(tokenData.id, updateData, {
      new: true,
    })

    console.log(res)

    return NextResponse.json(
      {
        message: `${
          type[0].toUpperCase() + type.slice(1, type.length)
        } category updated successfully`,
        success: true,
      },
      { status: 200 }
    )
  } catch (err) {
    console.log(err)
    return NextResponse.json(
      {
        message: "Error Updating Category",
        error: err.message,
        success: false,
      },
      { status: 400 }
    )
  }
}

export async function POST(request) {
  try {
    const reqBody = await request.json()
    const { name, type } = reqBody

    const tokenData = getDataFromToken(request)
    if (tokenData.error) {
      throw new Error(tokenData.error)
    }

    if (name.length == 0)
      return NextResponse.json(
        {
          validationError: "Validation Failed",
          errorHelperText: "Category name can't be empty",
        },
        { status: 400 }
      )

    const foundUser = await User.findById(tokenData.id)

    const oldCategories =
      type == "income"
        ? [...foundUser.incomeCategories]
        : [...foundUser.expensesCategories]

    const newCategories = [...oldCategories, name]

    if (oldCategories.indexOf(name) !== -1)
      return NextResponse.json(
        {
          error: "Category already exists",
          success: false,
        },
        { status: 400 }
      )
    const updateData =
      type == "income"
        ? { incomeCategories: newCategories }
        : { expensesCategories: newCategories }

    await User.findByIdAndUpdate(tokenData.id, updateData)

    return NextResponse.json(
      { message: "Category created successfully", success: true },
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
