import React from "react"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"

import { Pie } from "react-chartjs-2"
ChartJS.register(ArcElement)
ChartJS.register(Tooltip)
ChartJS.register(Legend)

export default function SpendingsChart() {
  return (
    <div className="w-1/2">
      <Pie
        data={{
          labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
          datasets: [
            {
              label: "# of Votes",
              data: [12, 19, 3, 5, 2, 3],
              borderWidth: 1,
              backgroundColor: ["#234373", "#3a4354", "#523a58"],
              borderColor: "#fff",
            },
          ],
        }}
      />
    </div>
  )
}
