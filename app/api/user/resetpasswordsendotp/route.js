import connect from "@/database/dbConnect"
import { sendEmail } from "@/helpers/sendEmail"
import { NextResponse } from "next/server"

connect()

export async function POST(request) {
  try {
    const reqBody = await request.json()
    const { email, id } = reqBody

    await sendEmail({ email, emailType: "RESET", userId: id })
    return NextResponse.json(
      { message: "Email sent successfully", success: true },
      { status: 200 }
    )
  } catch (err) {
    console.log(err)
    return NextResponse.json(
      {
        message: "Failed to send email",
        error: err.message,
        success: false,
      },
      { status: 400 }
    )
  }
}
