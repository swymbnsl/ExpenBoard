import React, { useState } from "react"
import ChartSelect from "../transaction_charts/chart_type_select"
import DoughnutChart from "./doughnut_chart"

export default function CategoriesChart() {
  const [type, setType] = useState("Line")

  const handleChange = (event) => {
    setType(event.target.value)
  }

  const labels = ["Shopping", "Grocery", "College", "Others"]
  const data = [10, 87, 30, 40]
  const colors = [
    "rgba(134, 167, 239, 1)",
    "rgba(234, 134, 239, 1)",
    "rgba(134, 230, 239, 1)",
    "rgba(75, 82, 87,1)",
  ]
  const sum = data.reduce((prevVal, currVal) => {
    return prevVal + currVal
  })

  return (
    <>
      <div className=" p-3 h-full">
        <div className="bg-themesurfacedim rounded-3xl p-3  h-[520px] w-full flex flex-col justify-center gap-4">
          <div className="flex w-full justify-between items-center">
            <span className="text-themeonsurface font-semibold text-lg ">
              Categories:
            </span>
            {/* <ChartSelect handleChange={handleChange} type={type} /> */}
          </div>
          <div className="h-[280px]">
            <DoughnutChart
              data={data}
              colors={colors}
              labels={labels}
              sum={sum}
            />

            {/* {type == "Line" ? <LineChart /> : <BarChart />} */}
          </div>
          <div className="flex flex-col gap-3">
            {labels.map((item, index) => {
              return (
                <div key={index} className="flex gap-3 items-center">
                  <div
                    className={`h-5 w-5 rounded-lg`}
                    style={{ backgroundColor: `${colors[index]}` }}
                  ></div>
                  <span className="text-themeonsurfacevar font-semibold">
                    {item} -
                  </span>
                  <span className="font-semibold">
                    {Math.round((data[index] / sum) * 100)} %
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
