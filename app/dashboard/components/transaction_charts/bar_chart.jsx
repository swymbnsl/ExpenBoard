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
              backgroundColor: (context) => {
                const ctx = context.chart.ctx
                const gradient = ctx.createLinearGradient(0, 0, 0, 150)
                gradient.addColorStop(0, "rgba(134, 239, 172, 1)")
                gradient.addColorStop(1, "rgba(134, 239, 172, 0.7)")
                return gradient
              },
              borderRadius: 3,
              barThickness: 12,
              borderColor: "rgba(0,0,0,1)",
              borderWidth: 1,
            },
            {
              label: "Expenses",
              data: expensesData.map((i) => i.value),
              backgroundColor: (context) => {
                const ctx = context.chart.ctx
                const gradient = ctx.createLinearGradient(0, 0, 0, 150)
                gradient.addColorStop(0, "rgba(252, 165, 165, 1)")
                gradient.addColorStop(1, "rgba(252, 165, 165, 0.7)")
                return gradient
              },
              borderRadius: 3,
              barThickness: 12,
              borderColor: "rgba(0,0,0,1)",
              borderWidth: 1,
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
