import { expensesData, incomeData } from "@/seed_data/temp-seed"
import { Chart as ChartJS, RadialLinearScale, Filler } from "chart.js"
import React from "react"
import { Radar } from "react-chartjs-2"
ChartJS.register(RadialLinearScale)
ChartJS.register(Filler)

export default function CategoriesRadarChart() {
  const data = {
    labels: incomeData.map((i) => i.label),
    datasets: [
      {
        label: "Income",
        data: incomeData.map((i) => i.value),
        fill: true,
        backgroundColor: "rgba(134, 239, 172, 0.8)",
        borderColor: "#86efac",
      },
      {
        label: "Income",
        data: expensesData.map((i) => i.value),
        fill: true,
        backgroundColor: "#fca5a5",
        borderColor: "#fca5a5",
      },
    ],
  }

  return (
    <>
      <div className="w-full h-full">
        <Radar data={data} />
      </div>
    </>
  )
}
