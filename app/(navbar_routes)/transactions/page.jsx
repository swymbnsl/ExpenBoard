"use client"

import { DatePickerWithRange } from "@/components/shared/date_range_picker"
import React, { useCallback, useState } from "react"
import { set } from "date-fns"

import TransactionsTable from "./components/transactions-table"

export default function Transactions() {
  const [date, setDate] = useState({
    from: new Date(
      new Date(new Date().setDate(new Date().getDate() - 30)).setHours(
        0,
        0,
        0,
        0
      )
    ),
    to: new Date(),
  })
  const [displayDate, setDisplayDate] = useState({
    from: new Date(
      new Date(new Date().setDate(new Date().getDate() - 30)).setHours(
        0,
        0,
        0,
        0
      )
    ),
    to: new Date(),
  })
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = useCallback((open) => {
    setIsOpen(open)
    if (!open && displayDate && displayDate.to && displayDate.from) {
      setDate((prevRange) => {
        return {
          ...prevRange,
          ["from"]: displayDate.from,
          ["to"]: set(displayDate.to, {
            hours: 23,
            minutes: 59,
            seconds: 59,
            milliseconds: 999,
          }),
        }
      })
    }
  })

  return (
    <>
      <div className="w-full h-full justify bg-center items-center">
        <div className="p-3">
          <span className="text-themeonsurface font-bold text-2xl">
            Transactions
          </span>{" "}
        </div>
        <div className="p-3">
          <DatePickerWithRange
            handleOpen={handleOpen}
            date={date}
            isOpen={isOpen}
            displayDate={displayDate}
            setDisplayDate={setDisplayDate}
          />
        </div>
        <div className="p-3 w-full justify-center items-center">
          <TransactionsTable date={date} />
        </div>{" "}
      </div>
    </>
  )
}
