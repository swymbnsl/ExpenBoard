import nodemailer from "nodemailer"
import User from "@/models/userModel"
import { v4 as uuidv4 } from "uuid"

export const sendEmail = async ({ email, emailType, userId }) => {
  try {
    const generatedToken = uuidv4()

    //1day to verify
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: generatedToken,
        verifyTokenExpiry: Date.now() + 1000 * 60 * 60 * 24,
      })

      //20min to reset pass
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: generatedToken,
        forgotPasswordTokenExpiry: Date.now() + 1000 * 60 * 20,
      })
    }

    var transport = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: process.env.GMAIL_SERVICE_EMAIL,
        pass: process.env.GMAIL_SERVICE_EMAIL_APP_PASSWORD,
      },
    })

    const mailOptions = {
      from: `Expenboard ${process.env.GMAIL_SERVICE_EMAIL}`,
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${generatedToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }
            or copy and paste the link below in your browser. <br> ${
              process.env.DOMAIN
            }/verifyemail?token=${generatedToken}
            </p>`,
    }

    const mailresponse = await transport.sendMail(mailOptions)
    return mailresponse
  } catch (error) {
    throw new Error(error.message)
  }
}
