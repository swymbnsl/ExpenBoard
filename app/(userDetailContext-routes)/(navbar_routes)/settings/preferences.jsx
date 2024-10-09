import { showErrorToast, showSuccessToast } from "@/utils/hot-toast"
import { Code, DollarSign, Lock, LogOut, Share2, User } from "lucide-react"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import CurrencySelect from "./currency-select"

export default function Preferences({
  contextCurrency,
  selectedCurrency,
  setSelectedCurrency,
}) {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await axios.get("/api/user/logout")
      localStorage.removeItem("pfp")
      showSuccessToast("Logout successful")
      router.push("/login")
    } catch (error) {
      console.log(error)
      showErrorToast("Error Logging out!!!")
    }
  }

  useEffect(() => {
    setSelectedCurrency(contextCurrency)
  }, [contextCurrency, setSelectedCurrency])

  return (
    <div className="p-3 w-full flex flex-col gap-1">
      <div
        onClick={() => {
          router.push("/profile")
        }}
        className="hover:bg-themesurfacedim rounded-xl h-[50px] w-full p-3 gap-3 text-themeonsurface flex items-center hover:cursor-pointer"
      >
        <User />
        Profile
      </div>
      <div className="hover:bg-themesurfacedim rounded-xl h-[50px] w-full p-3 pr-0 text-themeonsurface flex items-center justify-between hover:cursor-pointer">
        <div className="flex gap-3 items-center">
          <DollarSign />
          Currency
        </div>
        {contextCurrency ? (
          <CurrencySelect
            selectedCurrency={selectedCurrency}
            setSelectedCurrency={setSelectedCurrency}
          />
        ) : (
          <></>
        )}
      </div>

      <div
        onClick={() => {
          router.push("/share")
        }}
        className="hover:bg-themesurfacedim rounded-xl h-[50px] w-full p-3 gap-3 text-themeonsurface flex items-center hover:cursor-pointer"
      >
        <Share2 />
        Share settings
      </div>
      <div
        onClick={() => {
          router.push("/reset-password")
        }}
        className="hover:bg-themesurfacedim rounded-xl h-[50px] w-full p-3 gap-3 text-themeonsurface flex items-center hover:cursor-pointer"
      >
        <Lock />
        Reset password
      </div>
      <div
        onClick={() => {
          router.push("/about-dev")
        }}
        className="hover:bg-themesurfacedim rounded-xl h-[50px] w-full p-3 gap-3 text-themeonsurface flex items-center hover:cursor-pointer"
      >
        <Code />
        About Developer
      </div>
      <div
        onClick={handleLogout}
        className="hover:bg-themesurfacedim rounded-xl h-[50px] w-full p-3 gap-3 text-red-300 flex items-center hover:cursor-pointer"
      >
        <LogOut />
        Logout
      </div>
    </div>
  )
}
