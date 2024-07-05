import React from "react"
import { Chart as ChartJS, Tooltip, Legend, defaults } from "chart.js"

import { Bar } from "react-chartjs-2"
import { CategoryScale, LinearScale, BarElement } from "chart.js"
import { incomeData, expensesData } from "@/seed_data/temp-seed"

ChartJS.register(BarElement)
ChartJS.register(LinearScale)
ChartJS.register(CategoryScale)
ChartJS.register(Tooltip)
ChartJS.register(Legend)

defaults.maintainAspectRatio = false
defaults.responsive = true

export default function BarChart() {
  return (
    <div className="w-full h-full">
      <Bar
        data={{
          labels: incomeData.map((i) => i.label),
          datasets: [
            {
              label: "Income",
              data: incomeData.map((i) => i.value),
              borderRadius: 3,
              barThickness: 12,
              borderColor: "rgba(0,0,0,1)",
              borderWidth: 1,
              animations: {
                backgroundColor: {
                  type: "color",
                  duration: 1000,
                  easing: "linear",
                  from: "rgba(134, 239, 172, 1)",
                  to: "rgba(134, 239, 172, 0.8)",
                  loop: true,
                },
              },
            },
            {
              label: "Expenses",
              data: expensesData.map((i) => i.value),
              borderRadius: 3,
              barThickness: 12,
              borderColor: "rgba(0,0,0,1)",
              borderWidth: 1,
              animations: {
                backgroundColor: {
                  type: "color",
                  duration: 1000,
                  easing: "linear",
                  from: "rgba(252, 165, 165, 0.8)",
                  to: "rgba(252, 165, 165, 1)",
                  loop: true,
                },
              },
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
    </div>
  )
}
