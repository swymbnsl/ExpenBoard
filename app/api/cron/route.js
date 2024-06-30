import connect from "@/database/dbConnect"
import User from "@/models/userModel"
import { NextResponse } from "next/server"

connect()

export async function GET() {
  try {
    await User.deleteMany({
      $and: [{ isVerified: true }, { verifyTokenExpiry: { $lt: Date.now() } }],
    })

    return NextResponse.json(
      { message: "Users deleted successfully", success: true },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      {
        message: "Could not delete users",
        error: error.message,
        success: false,
      },
      { status: 500 }
    )
  }
}
