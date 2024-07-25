import { getHours, setHours } from "date-fns"
import React from "react"

export default function AmPmToggle({ value, setValue, ampm, setAmpm }) {
  return (
    <div className="flex">
      <span
        onClick={() => {
          let hrs = ""
          hrs = getHours(value) > 12 ? getHours(value) - 12 : getHours(value)
          setValue(setHours(value, hrs))
          setAmpm("am")
        }}
        className={
          (ampm == "am"
            ? "bg-themeonsurface text-themesurface"
            : "bg-transparent text-themeonsurface") +
          " hover:cursor-pointer w-[55px] h-[40px] border flex justify-center items-center rounded-s-lg border-white/20 text-sm font-medium transition-all duration-200"
        }
      >
        AM
      </span>
      <span
        onClick={() => {
          let hrs = ""
          hrs = getHours(value) < 12 ? getHours(value) + 12 : getHours(value)
          setValue(setHours(value, hrs))
          setAmpm("pm")
        }}
        className={
          (ampm == "pm"
            ? "bg-themeonsurface text-themesurface"
            : "bg-transparent text-themeonsurface") +
          " hover:cursor-pointer w-[55px] h-[40px] border flex justify-center items-center rounded-e-lg border-white/20 text-sm font-medium transition-all duration-200"
        }
      >
        PM
      </span>
    </div>
  )
}
