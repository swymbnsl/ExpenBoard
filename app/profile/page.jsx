"use client"
import { UserDetailsContext } from "@/context/userDetails"
import React, { useContext } from "react"
import Avatar from "./Avatar"

export default function Profile() {
  const { name, pfp } = useContext(UserDetailsContext)

  return (
    <div className="w-full flex flex-col items-center">
      <div className="p-3 w-full">
        <span className="text-themeonsurface font-bold text-2xl">
          Edit Profile
        </span>{" "}
      </div>
      <Avatar name={name} pfp={pfp} />
    </div>
  )
}
