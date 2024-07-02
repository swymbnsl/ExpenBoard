import React from "react"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"

import { Bar, Pie } from "react-chartjs-2"
import { CategoryScale, LinearScale, BarElement } from "chart.js"
ChartJS.register(BarElement)
ChartJS.register(LinearScale)
ChartJS.register(CategoryScale)
ChartJS.register(ArcElement)
ChartJS.register(Tooltip)
ChartJS.register(Legend)

export default function SpendingsChart() {
  return (
    <div className="w-full h-full">
      <Bar
        data={{
          labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
          ],
          datasets: [
            {
              label: "Expenses",
              backgroundColor: "rgba(0,0,0,1)",
              borderColor: "rgba(220, 220, 220, 1)",
              pointBackgroundColor: "rgba(220, 220, 220, 1)",
              pointBorderColor: "#fff",
              data: [40, 20, 12, 39, 10, 40, 39, 80, 40],
            },
            {
              label: "Income",
              backgroundColor: "rgba(151, 187, 205, 0.2)",
              borderColor: "rgba(151, 187, 205, 1)",
              pointBackgroundColor: "rgba(151, 187, 205, 1)",
              pointBorderColor: "#fff",
              data: [50, 12, 28, 29, 7, 25, 12, 70, 60],
            },
          ],
        }}
      />
    </div>
  )
}
