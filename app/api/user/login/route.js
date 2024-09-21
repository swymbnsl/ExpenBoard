import connect from "@/database/dbConnect"
import User from "@/models/userModel"
import { NextResponse } from "next/server"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

connect()

export async function POST(request) {
  try {
    const reqBody = await request.json()
    const { email, password } = reqBody

    const foundUser = await User.findOne({ email })
    if (!foundUser) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      )
    }

    const validPassword = await bcrypt.compare(password, foundUser.password)
    if (!validPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 })
    }

    if (foundUser.isVerified) {
      const tokenData = {
        id: foundUser._id,
        name: foundUser.name,
        email: foundUser.email,
        currency: foundUser.preferences.currency,
      }

      const token = jwt.sign(tokenData, process.env.TOKEN_SECRET)

      const response = NextResponse.json({
        message: "Login successful",
        pfp: foundUser.pfp,
        success: true,
      })
      response.cookies.set("token", token, {
        httpOnly: true,
      })
      return response
    }

    //Too bored to do it now, in future will redirect the user to verify email page if not verified to be able to resend verification email ig

    if (foundUser.verifyTokenExpiry > Date.now()) {
      return NextResponse.json(
        {
          error: "Please verify your email first",
          success: false,
        },
        { status: 400 }
      )
    } else {
      await User.deleteOne({ email })
      return NextResponse.json(
        { error: "Email was not verified. Please register again", clear: true },
        { status: 400 }
      )
    }
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
