import Navbar from "@/components/shared/navbar"
import React from "react"

export default function layout({ children }) {
  return (
    <>
      <Navbar />
      <main className="h-full">{children}</main>
    </>
  )
}
