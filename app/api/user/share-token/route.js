import connect from "@/database/dbConnect"
import { getDataFromToken } from "@/helpers/getDataFromToken"
import ShareToken from "@/models/shareTokensModel"
import User from "@/models/userModel"
import { randomUUID } from "crypto"
import { NextResponse } from "next/server"

connect()

export async function POST(request) {
  try {
    const reqBody = await request.json()
    const { from, to } = reqBody

    const tokenData = getDataFromToken(request)
    if (tokenData.error) {
      throw new Error(tokenData.error)
    }

    const foundUser = await User.findById(tokenData.id)

    const newToken = new ShareToken({
      user_id: tokenData.id,
      shareToken: randomUUID(),
      period: {
        from,
        to,
      },
    })

    const savedToken = await newToken.save()
    console.log(foundUser.shareToken)

    foundUser.shareToken.push(savedToken)

    await foundUser.save()

    return NextResponse.json(
      { message: "Share Token created successfully", success: true },
      { status: 200 }
    )
  } catch (err) {
    console.log(err)
    return NextResponse.json(
      {
        message: "Error creating Token",
        error: err.message,
        success: false,
      },
      { status: 400 }
    )
  }
}
