import React from "react"
import { Chart as ChartJS, Tooltip, Legend, defaults, plugins } from "chart.js"

import { Line } from "react-chartjs-2"
import { PointElement, LineElement, CategoryScale, LinearScale } from "chart.js"
import { incomeData, expensesData } from "@/seed_data/temp-seed"

ChartJS.register(LinearScale)
ChartJS.register(CategoryScale)
ChartJS.register(LineElement)
ChartJS.register(PointElement)
ChartJS.register(Tooltip)
ChartJS.register(Legend)

defaults.maintainAspectRatio = false
defaults.responsive = true

export default function LineChart() {
  return (
    <div className="w-full h-full">
      <Line
        data={{
          labels: incomeData.map((i) => i.label),
          datasets: [
            {
              label: "Income",
              data: incomeData.map((i) => i.value),
              backgroundColor: "#86efac",
              borderColor: "#86efac",
            },
            {
              label: "Expenses",
              data: expensesData.map((i) => i.value),
              backgroundColor: "#fca5a5",
              borderColor: "#fca5a5",
            },
          ],
        }}
        options={{
          plugins: {
            legend: {
              position: "bottom",
            },
          },
        }}
      />
    </div>
  )
}
