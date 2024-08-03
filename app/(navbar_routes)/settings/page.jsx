"use client"

import React, { useContext, useState } from "react"
import Profile from "./profile"
import { UserDetailsContext } from "@/context/userDetails"
import Preferences from "./preferences"
import Logo from "@/app/(navbar_routes)/settings/logo"
import PrimaryButton from "@/components/buttons/primary_button"

export default function Settings() {
  const { name, pfp, email, currency } = useContext(UserDetailsContext)
  const [disabled, setDisabled] = useState(false)
  const [selectedCurrency, setSelectedCurrency] = useState(currency)

  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex w-full items-center justify-between pr-3">
        <Logo />
        {selectedCurrency === currency ? (
          <></>
        ) : (
          <PrimaryButton
            clickFunction={async () => {
              //Currency updation logic here
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
