import { getDataFromToken } from "@/helpers/getDataFromToken"

import { NextResponse } from "next/server"
import connect from "@/database/dbConnect"

connect()

export async function GET(request) {
  try {
    const tokenData = getDataFromToken(request)
    if (tokenData.error) {
      throw new Error(tokenData.error)
    }
    return NextResponse.json({
      message: "Data extracted",
      tokenData,
    })
  } catch (error) {
    return NextResponse.json(
      { message: "Could'nt get data", error: error.message, success: false },
      { status: 400 }
    )
  }
}
