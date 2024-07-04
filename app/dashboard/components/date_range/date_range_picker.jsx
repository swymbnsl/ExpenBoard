"use client"
import { format } from "date-fns"
import { Calendar as CalendarIcon, ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function DatePickerWithRange({
  className,
  handleOpen,
  date,
  isOpen,
  setDate,
}) {
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover onOpenChange={handleOpen}>
        <PopoverTrigger
          asChild
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] bg-themesurfacedim justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <div className="flex items-center">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, yy")} -{" "}
                    {format(date.to, "LLL dd, yy")}
                  </>
                ) : (
                  format(date.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date</span>
              )}
            </div>
            {!isOpen ? <ChevronDown size={15} /> : <ChevronUp size={15} />}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0 flex flex-col gap-3 justify-center items-center "
          align="center"
        >
          <Calendar
            toDate={Date.now()}
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
