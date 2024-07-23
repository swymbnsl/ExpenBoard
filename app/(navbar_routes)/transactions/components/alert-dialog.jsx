"use client"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3"
import { TimeClock } from "@mui/x-date-pickers/TimeClock"
import { ChevronLeft, ChevronRight, Cross, X } from "lucide-react"
import { useState } from "react"
import {
  getHours,
  getMilliseconds,
  getMinutes,
  getSeconds,
  set,
  setHours,
} from "date-fns"

export default function SetTimeDialog({
  timeDialogOpen,
  setTimeDialogOpen,
  inputs,
  setInputs,
}) {
  const time = inputs.dateAndTime
  const [view, setView] = useState("hours")
  const [ampm, setAmpm] = useState(getHours(time) >= 12 ? "pm" : "am")
  const [value, setValue] = useState(time)

  const setTime = (newTime) => {
    setInputs((prev) => {
      return {
        ...prev,
        ["dateAndTime"]: set(value, {
          hours: getHours(newTime),
          minutes: getMinutes(newTime),
          seconds: getSeconds(newTime),
          milliseconds: getMilliseconds(newTime),
        }),
      }
    })
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <AlertDialog open={timeDialogOpen}>
        <AlertDialogContent
          aria-describedby="dialog-content"
          className=" bg-themesurface w-[95%]"
        >
          <div className="w-full h-full flex flex-col items-center justify-center">
            <AlertDialogHeader>
              <AlertDialogTitle>Choose Time</AlertDialogTitle>
            </AlertDialogHeader>

            <TimeClock
              view={view}
              value={value}
              onChange={(newValue, selectionState, view) => {
                if (selectionState == "partial") {
                  setView("minutes")
                }
                setValue(newValue)
              }}
              className="w-full"
              ampm
            />
            <div className="flex w-[90%] justify-between items-center mb-7">
              <span
                onClick={() => {
                  view == "hours" ? setView("minutes") : setView("hours")
                }}
                className="w-[30px] h-[30px] border rounded-md flex justify-center items-center border-white/20 hover:border-white/80 hover:cursor-pointer"
              >
                {view == "hours" ? (
                  <ChevronRight size={20} />
                ) : (
                  <ChevronLeft size={20} />
                )}
              </span>
              <div className="flex">
                <span
                  onClick={() => {
                    let hrs = ""
                    hrs =
                      getHours(value) > 12
                        ? getHours(value) - 12
                        : getHours(value)
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
                    hrs =
                      getHours(value) < 12
                        ? getHours(value) + 12
                        : getHours(value)
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
            </div>
            <div className="flex justify-evenly w-full">
              <div
                onClick={() => {
                  setTimeDialogOpen(false)
                }}
                className="hover:cursor-pointer hover:bg-themesurfacedim transition-all duration-100 w-[45%] h-[40px] rounded-md flex justify-center items-center  bg-transparent border border-white/20"
              >
                Cancel
              </div>
              <div
                onClick={() => {
                  setTime(value)
                  setTimeDialogOpen(false)
                }}
                className="hover:cursor-pointer hover:bg-themeonsurfacevar transition-all duration-100 w-[45%] h-[40px] rounded-md flex justify-center text-themesurface items-center  bg-themeonsurface"
              >
                Save
              </div>
            </div>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </LocalizationProvider>
  )
}
