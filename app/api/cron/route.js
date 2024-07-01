import connect from "@/database/dbConnect"
import User from "@/models/userModel"
import { NextResponse } from "next/server"

connect()

export async function GET() {
  try {
    const delRes = await User.deleteMany({
      $and: [{ isVerified: false }, { verifyTokenExpiry: { $lt: Date.now() } }],
    })

    return NextResponse.json(
      {
        message: "Users deleted successfully",
        success: true,
        delData: delRes,
      },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      {
        message: "Could not delete users",
        error: error,
        success: false,
      },
      { status: 500 }
    )
  }
}
