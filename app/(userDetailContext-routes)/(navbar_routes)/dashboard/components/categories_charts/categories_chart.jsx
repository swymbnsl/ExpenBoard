import { Skeleton } from "@mui/material"
import DoughnutChart from "./doughnut_chart"

export default function CategoriesChart({
  noOfTransactionsOfEachCategory,
  isLoading,
}) {
  const colors = [
    "rgba(134, 167, 239, 1)",
    "rgba(234, 134, 239, 1)",
    "rgba(134, 230, 239, 1)",
    "rgba(75, 82, 87,1)",
  ]

  const sortedTransactions = []

  for (let t in noOfTransactionsOfEachCategory) {
    sortedTransactions.push([t, noOfTransactionsOfEachCategory[t]])
  }

  sortedTransactions.sort((a, b) => b[1] - a[1])

  const labels = sortedTransactions.map((t) => t[0]).slice(0, 3)
  const data = sortedTransactions.map((t) => t[1]).slice(0, 3)
  labels.push("Others")

  let sum = 0

  if (sortedTransactions.length > 3) {
    const tempArr = sortedTransactions
      .map((t) => t[1])
      .slice(3, sortedTransactions.length)
      .reduce((prev, curr) => prev + curr)

    data.push(tempArr)
  } else labels.pop()

  if (data.length > 1) {
    sum = data.reduce((prev, curr) => prev + curr)
  }

  return (
    <>
      <div className=" p-3 w-full">
        <div className="bg-themesurfacedim rounded-3xl p-3 w-full flex flex-col justify-center gap-4">
          <div className="flex w-full justify-between items-center">
            <span className="text-themeonsurface font-semibold text-lg ">
              Categories:
            </span>
          </div>

          <div className="h-[280px]">
            {isLoading ? (
              <Skeleton animation="wave" variant="rounded" height={280} />
            ) : data.length >= 1 ? (
              <DoughnutChart data={data} labels={labels} />
            ) : (
              <div className="flex h-full justify-center items-center">
                <i className="text-themeonsurfacevar">
                  Not enough data to show
                </i>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-3">
            {labels.map((item, index) => {
              return (
                <div key={index} className="flex gap-3 items-center">
                  <div
                    className={`h-5 w-5 rounded-lg`}
                    style={{ backgroundColor: `${colors[index]}` }}
                  ></div>
                  <span className="text-themeonsurfacevar font-semibold">
                    {item} -
                  </span>
                  <span className="font-semibold">
                    {data.length > 1
                      ? Math.round((data[index] / sum) * 100)
                      : "100"}{" "}
                    %
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
