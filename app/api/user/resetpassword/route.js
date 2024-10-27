import connect from "@/database/dbConnect"
import { NextResponse } from "next/server"
import User from "@/models/userModel"
import bcrypt from "bcrypt"

connect()

export async function POST(request) {
  try {
    const reqBody = await request.json()
    const { otp, id, oldPass, newPass } = reqBody

    const user = await User.findById(id)

    if (!user) {
      return NextResponse.json({ error: "Invalid User" }, { status: 400 })
    }
    if (
      user.resetPasswordToken != otp ||
      user.resetPasswordTokenExpiry < Date.now()
    ) {
      return NextResponse.json(
        { error: "Invalid or Expired OTP" },
        { status: 400 }
      )
    }

    const validPassword = await bcrypt.compare(oldPass, user.password)
    if (!validPassword) {
      return NextResponse.json(
        { error: "Invalid Current password" },
        { status: 400 }
      )
    }

    if (newPass.length < 6) {
      return NextResponse.json(
        { error: "New password must be atleast 6 characters long" },
        { status: 400 }
      )
    }

    user.password = await bcrypt.hash(newPass, 12)
    user.resetPasswordToken = undefined
    user.resetPasswordTokenExpiry = undefined
    await user.save()

    return NextResponse.json({
      message: "Password reset successfully",
      success: true,
    })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
