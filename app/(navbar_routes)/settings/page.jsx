"use client"

import React, { useContext } from "react"
import Profile from "./profile"
import { UserDetailsContext } from "@/context/userDetails"

export default function Settings() {
  const { name, pfp, email } = useContext(UserDetailsContext)

  return (
    <div className="w-full flex flex-col items-center">
      <div className="p-3 w-full ">
        <span className="text-themeonsurface font-bold text-2xl">Settings</span>
      </div>
      <Profile name={name} pfp={pfp} email={email} />
    </div>
  )
}
