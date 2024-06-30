"use client"
import { dataContext } from "@/context/userDetails"
import { useContext } from "react"

const links = [
  {
    path: "/",
    name: "Overview",
  },
  {
    path: "/",
    name: "Transactions",
  },
  {
    path: "/",
    name: "Settings",
  },
  {
    path: "/",
    name: "Account",
  },
]

export const SheetNavLinks = () => {
  return links.map((item) => {
    return (
      <span className="text-xl font-bold hover:cursor-pointer text-themeonsurfacelightdim hover:text-themeprimarylight">
        {item.name}
      </span>
    )
  })
}
