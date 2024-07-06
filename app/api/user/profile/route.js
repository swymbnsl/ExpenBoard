import { getDataFromToken } from "@/helpers/getDataFromToken"

import { NextResponse } from "next/server"
import User from "@/models/userModel"
import connect from "@/database/dbConnect"

connect()

export async function GET(request) {
  try {
    const tokenData = getDataFromToken(request)
    return NextResponse.json({
      message: "Data extracted",
      tokenData,
    })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}
