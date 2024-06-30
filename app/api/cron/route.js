import connect from "@/database/dbConnect"
import User from "@/models/userModel"
import { NextResponse } from "next/server"

connect()

export async function GET() {
  const delRes = await User.deleteMany({
    verifyTokenExpiry: { $lt: Date.now() },
  })
  console.log(delRes)

  return NextResponse.json({ success: true }, { status: 200 })
}
