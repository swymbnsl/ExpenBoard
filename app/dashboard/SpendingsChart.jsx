import React from "react"
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  defaults,
  plugins,
} from "chart.js"

import { Bar, Pie } from "react-chartjs-2"
import { CategoryScale, LinearScale, BarElement } from "chart.js"
import { incomeData, expensesData } from "@/seed_data/temp-seed"
ChartJS.register(BarElement)
ChartJS.register(LinearScale)
ChartJS.register(CategoryScale)
ChartJS.register(ArcElement)
ChartJS.register(Tooltip)
ChartJS.register(Legend)

defaults.maintainAspectRatio = false
defaults.responsive = true

export default function SpendingsChart() {
  return (
    <div className="w-full h-full">
      <Bar
        data={{
          labels: incomeData.map((i) => i.label),
          datasets: [
            {
              label: "Income",
              data: incomeData.map((i) => i.value),
              backgroundColor: "#86efac",
              borderRadius: 3,
              barThickness: 10,
            },
            {
              label: "Expenses",
              data: expensesData.map((i) => i.value),
              backgroundColor: "#FCA5A5",
              borderRadius: 3,
              barThickness: 10,
            },
          ],
        }}
        options={{
          plugins: {
            legend: {
              position: "bottom",
              labels: {
                useBorderRadius: true,
                borderRadius: 1,
              },
            },
          },
        }}
      />
    </div>
  )
}
