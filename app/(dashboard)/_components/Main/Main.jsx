import React from "react"
import SpendingsChart from "./SpendingsChart"

export const Main = () => {
  return (
    <>
      <div className="flex w-full h-full justify-center">
        <div className="w-[85%] rounded-3xl bg-themesurfacedim text-white flex items-center justify-center">
          <SpendingsChart />
        </div>
      </div>
    </>
  )
}
