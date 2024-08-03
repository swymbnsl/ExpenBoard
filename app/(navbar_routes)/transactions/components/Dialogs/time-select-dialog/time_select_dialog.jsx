"use client"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3"
import { TimeClock } from "@mui/x-date-pickers/TimeClock"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"
import {
  getHours,
  getMilliseconds,
  getMinutes,
  getSeconds,
  set,
  setHours,
} from "date-fns"
import * as VisuallyHidden from "@radix-ui/react-visually-hidden"
import PrimaryButton from "@/components/buttons/primary_button"
import SecondaryButton from "@/components/buttons/secondary_button"
import AmPmToggle from "./ampm_toggle"

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
        <AlertDialogContent className="bg-themesurface w-[95%]">
          <div className="w-full h-full flex flex-col items-center justify-center">
            <AlertDialogHeader>
              <AlertDialogTitle>Choose Time</AlertDialogTitle>
              <VisuallyHidden.Root>
                <AlertDialogDescription>
                  Dialog for Time selection
                </AlertDialogDescription>
              </VisuallyHidden.Root>
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
              <AmPmToggle
                value={value}
                setValue={setValue}
                ampm={ampm}
                setAmpm={setAmpm}
              />
            </div>
            <div className="flex justify-evenly w-full">
              <SecondaryButton
                clickFunction={() => {
                  setTimeDialogOpen(false)
                }}
                width="45%"
                height="40px"
                buttonText={"Cancel"}
              />

              <PrimaryButton
                clickFunction={() => {
                  setTime(value)
                  setTimeDialogOpen(false)
                }}
                disabled={false}
                width="45%"
                height="40px"
                buttonText={"Save"}
              />
            </div>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </LocalizationProvider>
  )
}
