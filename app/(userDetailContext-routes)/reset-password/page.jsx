"use client"
import PrimaryButton from "@/components/buttons/primary_button"
import OtpInput from "@/components/shared/otp_input"
import { UserDetailsContext } from "@/context/userDetails"
import { showErrorToast, showSuccessToast } from "@/utils/hot-toast"
import { TextField } from "@mui/material"
import axios from "axios"
import { ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import React, { useContext, useEffect, useState } from "react"

export default function ResetPassword() {
  const [showOtpInput, setShowOtpInput] = useState(false)
  const [resendOTPCountdown, setResendOTPCountdown] = useState(15)
  const [inputs, setInputs] = useState({
    currPass: "",
    newPass: "",
    otp: "",
  })
  const [buttonText, setbuttonText] = useState("Send OTP")
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const router = useRouter()

  const { id, email } = useContext(UserDetailsContext)

  const sendOTP = async () => {
    try {
      setbuttonText("Sending OTP...")
      setButtonDisabled(true)
      await axios.post("/api/user/resetpasswordsendotp", {
        email,
        id,
      })
      setbuttonText("Verify OTP")
    } catch (error) {
      showErrorToast("Error sending OTP")
      setbuttonText("Send OTP")
    } finally {
      setButtonDisabled(false)
    }
  }

  const resetPass = async () => {
    try {
      setButtonDisabled(true)
      setbuttonText("Verifying OTP...")
      const res = await axios.post("/api/user/resetpassword", {
        otp: inputs.otp,
        newPass: inputs.newPass,
        oldPass: inputs.currPass,
        id,
      })
      showSuccessToast(res.data.message)
      setInputs({
        currPass: "",
        newPass: "",
        otp: "",
      })
      setShowOtpInput(false)
      router.back()
      setButtonDisabled(false)
    } catch (error) {
      setbuttonText("Verify OTP")
      showErrorToast(error.response.data.error)
      setButtonDisabled(false)
    }
  }

  const handleButtonClick = async () => {
    if (!showOtpInput) {
      await sendOTP()
      setShowOtpInput(true)
      setButtonDisabled(true)
    } else {
      resetPass()
    }
  }

  const handleChange = (evt) => {
    setInputs((prev) => {
      return {
        ...prev,
        [evt.target.name]: evt.target.value,
      }
    })
  }

  useEffect(() => {
    let timer =
      resendOTPCountdown > 0 &&
      setInterval(() => setResendOTPCountdown(resendOTPCountdown - 1), 1000)
    return () => clearInterval(timer)
  }, [resendOTPCountdown])

  useEffect(() => {
    showOtpInput &&
      (inputs.otp.length == 6
        ? setButtonDisabled(false)
        : setButtonDisabled(true))
  }, [inputs.otp])
  useEffect(() => {
    inputs.currPass.length == 0 || inputs.newPass.length == 0
      ? setButtonDisabled(true)
      : setButtonDisabled(false)
  }, [inputs.currPass, inputs.newPass])

  return (
    <div className="w-full h-full flex flex-col p-3 gap-3 items-center">
      <div className="w-full flex gap-3 items-center">
        <span
          onClick={() => {
            router.back()
          }}
          className="w-[35px] h-[35px] border rounded-md flex justify-center items-center border-white/20 hover:border-white/80 hover:cursor-pointer"
        >
          <ChevronLeft size={25} strokeWidth={3} />
        </span>
        <span className="text-themeonsurface font-bold text-2xl">
          Reset Password
        </span>{" "}
      </div>
      <div className="text-center w-full h-full flex justify-center items-center">
        <div className=" flex gap-6 flex-col w-[300px] ">
          <span className="text-3xl font-bold text-themeonsurface">
            Reset your password
          </span>
          <TextField
            fullWidth="true"
            name="currPass"
            value={inputs.currPass}
            onChange={handleChange}
            label="Current Password"
            type="text"
          />
          <TextField
            fullWidth="true"
            name="newPass"
            value={inputs.newPass}
            onChange={handleChange}
            label="New Password"
            type="text"
          />

          {showOtpInput && (
            <div className="mx-auto flex flex-col items-end gap-3">
              <OtpInput
                value={inputs.otp}
                onChange={(value) =>
                  setInputs((prev) => {
                    return {
                      ...prev,
                      ["otp"]: value,
                    }
                  })
                }
              />
              <span
                className={
                  "text-sm " +
                  (resendOTPCountdown == 0 ? "hover:cursor-pointer" : "")
                }
                onClick={() => {
                  sendOTP()
                  resendOTPCountdown == 0 && setResendOTPCountdown(15)
                }}
              >
                {resendOTPCountdown == 0
                  ? "Resend OTP"
                  : `Resend OTP in 00:${
                      String(resendOTPCountdown).length > 1
                        ? resendOTPCountdown
                        : `0${resendOTPCountdown}`
                    }`}
              </span>
            </div>
          )}
          <PrimaryButton
            clickFunction={handleButtonClick}
            disabled={buttonDisabled}
            width="100%"
            height="40px"
            buttonText={buttonText}
          />
        </div>
      </div>
    </div>
  )
}
