import React, { useState } from "react"
import ChartSelect from "../transaction_charts/chart_type_select"
import DoughnutChart from "./doughnut_chart"

export default function CategoriesChart() {
  const [type, setType] = useState("Line")

  const handleChange = (event) => {
    setType(event.target.value)
  }

  return (
    <>
      <div className=" p-3 h-full">
        <div className="bg-themesurfacedim rounded-3xl p-3  h-[350px] w-full flex flex-col justify-center gap-4">
          <div className="flex w-full justify-between items-center">
            <span className="text-themeonsurface font-semibold text-lg ">
              Categories:
            </span>
            {/* <ChartSelect handleChange={handleChange} type={type} /> */}
          </div>
          <div className="h-[80%]">
            <DoughnutChart />
            {/* {type == "Line" ? <LineChart /> : <BarChart />} */}
          </div>
        </div>
      </div>
    </>
  )
}
