import { expensesData, incomeData } from "@/seed_data/temp-seed"
import React from "react"
import { Doughnut } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement } from "chart.js"

ChartJS.register(ArcElement)

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

export default function DoughnutChart() {
  return (
    <>
      <Doughnut
        data={{
          labels: labels,
          datasets: [
            {
              label: "Expenses",
              data: data,
              borderColor: "#111318",
              backgroundColor: [
                "rgba(134, 167, 239, 1)",
                "rgba(234, 134, 239, 1)",
                "rgba(134, 230, 239, 1)",
                "rgba(75, 82, 87,1)",
              ],
              hoverOffset: 10,
            },
          ],
        }}
        options={{
          plugins: {
            legend: {
              display: false,
            },
          },
        }}
      />
      {labels.map((item, index) => {
        return (
          <div className="flex gap-3 items-center">
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
    </>
  )
}
