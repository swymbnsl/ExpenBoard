import React from "react"
import { Chart as ChartJS, Tooltip, Legend, defaults } from "chart.js"

import { Line } from "react-chartjs-2"
import {
  PointElement,
  LineElement,
  CategoryScale,
  LinearScale,
  Filler,
} from "chart.js"
import { format } from "date-fns"

ChartJS.register(LinearScale)
ChartJS.register(CategoryScale)
ChartJS.register(LineElement)
ChartJS.register(PointElement)
ChartJS.register(Tooltip)
ChartJS.register(Legend)
ChartJS.register(Filler)

defaults.maintainAspectRatio = false
defaults.responsive = true

export default function AreaChart({ eachDayTransactions }) {
  return (
    <div className="w-full h-full">
      <Line
        data={{
          labels: eachDayTransactions.map((i) => format(i.date, "d LLL")),
          datasets: [
            {
              label: "Income",
              data: eachDayTransactions.map((i) => i.income),
              backgroundColor: (context) => {
                const ctx = context.chart.ctx
                const gradient = ctx.createLinearGradient(0, 0, 0, 170)
                gradient.addColorStop(0, "rgba(134, 239, 172, 0.7)")
                gradient.addColorStop(1, "rgba(134, 239, 172, 0)")
                return gradient
              },
              borderColor: "#86efac",
              fill: true,
            },
            {
              label: "Expenses",
              data: eachDayTransactions.map((i) => i.expenses),
              backgroundColor: (context) => {
                const ctx = context.chart.ctx
                const gradient = ctx.createLinearGradient(0, 0, 0, 170)
                gradient.addColorStop(0, "rgba(252, 165, 165, 0.7)")
                gradient.addColorStop(1, "rgba(252, 165, 165, 0)")
                return gradient
              },
              borderColor: "#fca5a5",
              fill: true,
            },
          ],
        }}
        options={{
          plugins: {
            legend: {
              display: false,
            },
          },
          animations: {
            tension: {
              duration: 1000,
              easing: "linear",
              from: 0.5,
              to: 0,
              loop: true,
            },
          },
          scales: {
            x: {
              grid: {
                display: false,
              },
            },
            y: {
              grid: {
                display: false,
              },
            },
          },
        }}
      />
    </div>
  )
}
