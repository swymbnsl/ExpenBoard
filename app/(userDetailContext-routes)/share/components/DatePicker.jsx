"use client"

import * as React from "react"
import {
  format,
  getHours,
  getMilliseconds,
  getMinutes,
  getSeconds,
  set,
} from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function DatePicker({ date, setDate, width }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          sx={{ width }}
          className={cn(
            " h-[40px] bg-themesurfacedim hover:bg-themenavbar justify-start text-left",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "MMM dd, yyy") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bg-themesurface">
        <Calendar
          required
          mode="single"
          selected={date}
          onSelect={(newDate) => {
            setDate(newDate)
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
