import connect from "@/database/dbConnect"
import { getDataFromToken } from "@/helpers/getDataFromToken"
import ShareToken from "@/models/shareTokensModel"
import User from "@/models/userModel"
import { randomUUID } from "crypto"
import { NextResponse } from "next/server"

connect()

export async function GET(request) {
  try {
    const tokenData = getDataFromToken(request)
    if (tokenData.error) {
      throw new Error(tokenData.error)
    }
    const foundUser = await User.findById(tokenData.id).populate("shareToken")

    return NextResponse.json(
      {
        message: "Share Tokens Fetched successfully",
        success: true,
        tokens: foundUser.shareToken,
      },
      { status: 200 }
    )
  } catch (err) {
    console.log(err)
    return NextResponse.json(
      {
        message: "Error fetching Tokens",
        error: err.message,
        success: false,
      },
      { status: 400 }
    )
  }
}

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

export async function DELETE(request) {
  try {
    const id = request.nextUrl.searchParams.get("id")
    const deleteRes = await ShareToken.findByIdAndDelete(id)

    const tokenData = getDataFromToken(request)
    if (tokenData.error) {
      throw new Error(tokenData.error)
    }

    const foundUser = await User.findById(tokenData.id)

    foundUser.shareToken = foundUser.shareToken.filter((i) => i._id != id)

    await foundUser.save()

    return NextResponse.json(
      {
        message: "Token Deleted successfully",
        success: true,
        deleteRes,
      },
      { status: 200 }
    )
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      {
        message: "Error deleting Token",
        error: error.message,
        success: false,
      },
      { status: 400 }
    )
  }
}
