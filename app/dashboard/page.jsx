"use client"
import { Avatar } from "@mui/material"
import { blue } from "@mui/material/colors"
import { Bolt } from "lucide-react"
import React from "react"
import SpendingsChart from "./SpendingsChart"

export default function Dashboard() {
  return (
    <>
      <div className="w-full h-full">
        <div className="w-full flex p-3 justify-between items-center">
          <div className="flex flex-col">
            <span className="text-themeonsurface text-lg">Good Evening</span>
            <span className="text-themeonsurface font-bold text-2xl">
              Swayam
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Bolt color="#e2e2e9" />
            <Avatar sx={{ bgcolor: blue[500] }}>S</Avatar>
          </div>
        </div>

        <div className="flex p-3 justify-between">
          <div className=" bg-green-300 rounded-3xl flex flex-col justify-center w-[48%] px-3 h-24 gap-1">
            <span className="text-black text-xs">Income this month</span>
            <span className="text-black font-bold text-2xl">₹40000</span>
          </div>
          <div className=" bg-red-300 rounded-3xl flex flex-col justify-center w-[48%] px-3 h-24 gap-1">
            <span className="text-black text-xs">Expenses this month</span>
            <span className="text-black font-bold text-2xl">₹2000</span>
          </div>
        </div>

        <div className="w-full h-full p-3">
          <div className="bg-themesurfacedim rounded-3xl p-3 w-full">Chart</div>
        </div>
      </div>
    </>
  )
}
