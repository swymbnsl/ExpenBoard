import React, { useState } from "react"
import ChartSelect from "./chart_type_select"
import AreaChart from "./area_chart"
import BarChart from "./bar_chart"
import { Skeleton } from "@mui/material"

export default function TransactionsChart({ eachDayTransactions, isLoading }) {
  const [type, setType] = useState("Area")

  const handleChange = (event) => {
    setType(event.target.value)
  }

  return (
    <>
      <div className="h-[350px] w-full p-3">
        <div className="bg-themesurfacedim rounded-3xl p-3 h-full w-full flex flex-col justify-center gap-4">
          <div className="flex w-full justify-between items-center">
            <span className="text-themeonsurface font-semibold text-lg ">
              Transactions:
            </span>
            <ChartSelect handleChange={handleChange} type={type} />
          </div>

          {isLoading ? (
            <Skeleton variant="rounded" animation="wave" height={214} />
          ) : (
            <div className="h-[80%]">
              {type == "Area" ? (
                <AreaChart eachDayTransactions={eachDayTransactions} />
              ) : (
                <BarChart eachDayTransactions={eachDayTransactions} />
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
