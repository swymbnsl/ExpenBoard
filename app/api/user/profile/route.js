import { getDataFromToken } from "@/helpers/getDataFromToken"

import { NextResponse } from "next/server"
import connect from "@/database/dbConnect"
import userUpdateSchema from "@/schemas/userUpdateSchema"
import User from "@/models/userModel"
import jwt from "jsonwebtoken"

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

export async function PATCH(request) {
  try {
    const reqBody = await request.json()
    const { name, email, pfp, currency } = reqBody

    const tokenData = getDataFromToken(request)
    if (tokenData.error) {
      throw new Error(tokenData.error)
    }

    const joiRes = userUpdateSchema.validate(reqBody)
    if (joiRes.error) {
      return NextResponse.json(
        { joiError: "Validation Failed", joiRes },
        { status: 400 }
      )
    }

    await User.findByIdAndUpdate(tokenData.id, { name, email, pfp, currency })

    const newTokenData = {
      ...tokenData,
      ...reqBody,
    }

    delete newTokenData.pfp

    const token = jwt.sign(newTokenData, process.env.TOKEN_SECRET)

    const response = NextResponse.json(
      { message: "Profile updated successfully", token, success: true },
      { status: 200 }
    )
    response.cookies.set("token", token, {
      httpOnly: true,
    })
    return response
  } catch (err) {
    console.log(err)
    return NextResponse.json(
      {
        message: "Error Updating profile",
        error: err.message,
        success: false,
      },
      { status: 400 }
    )
  }
}
