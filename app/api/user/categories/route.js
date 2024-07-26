import { NextResponse } from "next/server"
import connect from "@/database/dbConnect"
import { getDataFromToken } from "@/helpers/getDataFromToken"
import User from "@/models/userModel"

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
