import { TrendingDown, TrendingUp } from "lucide-react"
import React from "react"

export default function TransactionCard({ type, name, amount }) {
  return (
    <>
      <div className="bg-themesurfacedim h-[10%] w-full rounded-xl flex items-center justify-between py-6 px-3 ">
        <div className="flex items-center gap-3 ">
          <div
            className={
              (type == "income"
                ? "text-green-700 bg-green-100"
                : "text-red-700 bg-red-100") +
              " w-[40px] h-[40px] rounded-xl flex justify-center items-center "
            }
          >
            {type == "income" ? (
              <TrendingUp size={25} strokeWidth={2.5} />
            ) : (
              <TrendingDown size={25} strokeWidth={2.5} />
            )}
          </div>
          <span className="text-themeonsurface font-bold text-lg">{name}</span>
        </div>
        <span
          className={
            type == "income"
              ? "text-green-300"
              : "text-red-300" + " font-bold text-lg"
          }
        >
          {amount}
        </span>
      </div>
    </>
  )
}
