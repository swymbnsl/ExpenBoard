import React from "react"
import CountUp from "react-countup"

export default function SummaryCard({ type, income, expenses }) {
  const colors = {
    income: "bg-green-300",
    expense: "bg-red-300",
  }

  return (
    <div
      className={`${colors[type]} rounded-3xl flex flex-col justify-center w-[48%] px-3 h-24 gap-1`}
    >
      <span className="text-sm text-black ">
        {type == "income" ? "Income" : "Expenses"}
      </span>
      <span className="text-black font-extrabold text-2xl">
        ₹
        <CountUp
          end={type == "income" ? income : expenses}
          preserveValue
          useIndianSeparators
        />
      </span>
    </div>
  )
}