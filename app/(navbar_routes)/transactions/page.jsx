"use client"

import { DatePickerWithRange } from "@/components/shared/date_range_picker"
import React from "react"

export default function Transactions() {
  return (
    <>
      <div className="w-full h-full justify bg-center items-center">
        <div className="p-3">
          <span className="text-themeonsurface font-bold text-2xl">
            Transactions
          </span>{" "}
        </div>
        <div className="p-3">
          <DatePickerWithRange />
        </div>
      </div>
    </>
  )
}
