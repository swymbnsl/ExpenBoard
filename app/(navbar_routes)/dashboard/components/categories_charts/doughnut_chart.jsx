import React from "react"
import { Doughnut } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement } from "chart.js"

ChartJS.register(ArcElement)

export default function DoughnutChart({ data, labels }) {
  return (
    <>
      <Doughnut
        data={{
          labels: labels.slice(0, 2),
          datasets: [
            {
              label: "Expenses",
              data: data,
              borderColor: "#1D2024",
              borderWidth: 4,
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
            tooltip: {
              callbacks: {
                title: function (tooltipItem) {
                  return labels[tooltipItem[0].dataIndex]
                },
                label: function (tooltipItem) {
                  return `Transactions: ${tooltipItem.parsed}`
                },
              },
            },
          },
        }}
      />
    </>
  )
}
