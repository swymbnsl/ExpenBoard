import React, { useState } from "react"
import ChartSelect from "../transaction_charts/chart_type_select"
import LineChart from "../transaction_charts/line_chart"
import BarChart from "../transaction_charts/bar_chart"

export default function CategoriesChart() {
  const [type, setType] = useState("Line")

  const handleChange = (event) => {
    setType(event.target.value)
  }

  return (
    <>
      <div className="h-[45%] p-3">
        <div className="bg-themesurfacedim rounded-3xl p-3 h-full w-full flex flex-col justify-center gap-4">
          <div className="flex w-full justify-between items-center">
            <span className="text-themeonsurfacevar text-muted-foreground">
              Overview:
            </span>
            <ChartSelect handleChange={handleChange} type={type} />
          </div>
          <div className="h-[80%]">
            {type == "Line" ? <LineChart /> : <BarChart />}
          </div>
        </div>
      </div>
    </>
  )
}
