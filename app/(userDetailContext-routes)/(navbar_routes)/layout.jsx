import Navbar from "@/components/shared/navbar"
import { UserDetailsProvider } from "@/context/userDetails"
import React from "react"

export default function layout({ children }) {
  return (
    <>
      {/* <UserDetailsProvider> */}
      {children}
      <Navbar />
      {/* </UserDetailsProvider> */}
    </>
  )
}
