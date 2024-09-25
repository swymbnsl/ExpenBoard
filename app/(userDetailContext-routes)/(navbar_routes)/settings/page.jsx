"use client"

import React, { useContext, useState } from "react"
import Profile from "./profile"
import { UserDetailsContext } from "@/context/userDetails"
import Preferences from "./preferences"
import PrimaryButton from "@/components/buttons/primary_button"
import Logo from "./logo"
import { useRouter } from "next/navigation"
import { showErrorToast, showSuccessToast } from "@/utils/hot-toast"
import axios from "axios"

export default function Settings() {
  const { name, pfp, email, currency, getLocalDetails } =
    useContext(UserDetailsContext)
  const [disabled, setDisabled] = useState(false)
  const [selectedCurrency, setSelectedCurrency] = useState(currency)

  const router = useRouter()

  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex w-full items-center justify-between pr-3">
        <Logo />
        {selectedCurrency !== currency && (
          <PrimaryButton
            clickFunction={async () => {
              try {
                setDisabled(true)
                await axios.patch("/api/user/profile", {
                  name,
                  pfp,
                  email,
                  currency: selectedCurrency,
                })
                getLocalDetails(true)
                showSuccessToast("Currency updated")
                router.refresh()
                setDisabled(false)
              } catch (error) {
                showErrorToast(error.response.data.error)
              }
            }}
            width="20%"
            height="40px"
            disabled={disabled}
            buttonText={"Save"}
          />
        )}
      </div>
      <div className="w-full px-3">
        <div className="bg-themesurfacedim w-full py-3 rounded-3xl ">
          <Profile name={name} pfp={pfp} email={email} />
        </div>
      </div>
      <Preferences
        selectedCurrency={selectedCurrency}
        setSelectedCurrency={setSelectedCurrency}
        contextCurrency={currency}
      />
    </div>
  )
}
