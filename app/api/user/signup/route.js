import connect from "@/database/dbConnect"
import { sendEmail } from "@/helpers/sendEmail"
import User from "@/models/userModel"
import userSchema from "@/schemas/userSignupSchema"
import bcrypt from "bcrypt"
import { NextResponse } from "next/server"

connect()

export async function POST(req) {
  try {
    const data = await req.json()
    const { name, email, password } = data

    const foundUser = await User.findOne({ email })

    const joiRes = userSchema.validate(data)
    if (joiRes.error) {
      return NextResponse.json(
        { joiError: "Validation Failed", joiRes },
        { status: 400 }
      )
    }

    if (foundUser) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 }
      )
    }

    const hashedPass = await bcrypt.hash(password, 12)

    const newUser = new User({ name, email, password: hashedPass })

    const savedUser = await newUser.save()

    if (!savedUser) {
      return NextResponse.json(
        { error: "Error registering user. Try again later" },
        { status: 500 }
      )
    }

    await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id })

    return NextResponse.json(
      {
        message: "User registered successully, Please verify your email",
        email: savedUser.email,
      },
      { status: 200 }
    )
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
