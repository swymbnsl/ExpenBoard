import { expensesData, incomeData } from "@/seed_data/temp-seed"
import React from "react"
import { Doughnut } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement } from "chart.js"

ChartJS.register(ArcElement)

export default function DoughnutChart() {
  return (
    <>
      <Doughnut
        data={{
          labels: ["Shopping", "Grocery", "College", "Others"],
          datasets: [
            {
              label: "Expenses",
              data: [10, 20, 30, 40],
              borderColor: "#111318",
              backgroundColor: [
                "rgba(134, 167, 239, 1)",
                "rgb(234, 134, 239)",
                "rgb(134, 230, 239)",
                "rgb(75, 82, 87)",
              ],
              hoverOffset: 10,
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
    </>
  )
}
