"use client"

import { Button } from "@mui/material"
import axios from "axios"
import Link from "next/link"
import React, { useEffect, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { showErrorToast, showSuccessToast } from "@/utils/hot-toast"
import { Toaster } from "react-hot-toast"
import { useRouter } from "next/navigation"

function VerifyEmailComponent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [token, setToken] = useState("")
  const [verified, setVerified] = useState(false)
  const [loading, setLoading] = useState(false)
  const [uriDirect, setUriDirect] = useState(false)
  const [buttonDisabled, setButtonDisabled] = useState(true)

  const verifyUser = async () => {
    try {
      setLoading(true)
      const res = await axios.post("/api/user/verifyemail", { token })
      setVerified(true)
      showSuccessToast(res.data.message)
      router.push("/login")
    } catch (error) {
      console.log(error)
      showErrorToast(error.response.data.error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const token = searchParams.get("token")
    setToken(token)
    if (!token || token.length === 0) {
      setUriDirect(true)
    }
    setButtonDisabled(false)
  }, [searchParams])

  let buttonText = "Verify Email"

  if (uriDirect) {
    buttonText = "Invalid URL"
  } else if (loading) {
    buttonText = "Loading..."
  } else if (verified) {
    buttonText = "Verified Successfully"
  }

  return (
    <>
      <Toaster />
      <div className="w-full h-full justify-center flex items-center text-slate-50">
        <div className="w-[300px] flex flex-col gap-6">
          <span className="text-4xl font-bold text-themeonsurface">
            Verify Email
          </span>
          <div className="text-themeonsurfacevar">
            Click on the button below to verify your email and continue with
            your account on Expenboard
          </div>
          <Button
            variant="contained"
            color="primary"
            fullWidth="true"
            onClick={verifyUser}
            disabled={
              uriDirect || loading || verified || buttonDisabled ? true : false
            }
          >
            {buttonText}
          </Button>
          <Link href="/login" className="text-themeprimary">
            Login
          </Link>
        </div>
      </div>
    </>
  )
}

export default function VerifyEmail() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmailComponent />
    </Suspense>
  )
}
