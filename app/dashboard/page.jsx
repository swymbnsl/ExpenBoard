"use client"
import { Avatar } from "@mui/material"
import { blue } from "@mui/material/colors"
import React, { useState } from "react"
import LineChart from "./components/line_chart"
import BarChart from "./components/bar_chart"
import { ThemeProvider } from "@emotion/react"
import { CssBaseline, createTheme } from "@mui/material"
import ChartSelect from "./components/chart_type_select"
import SummaryCard from "./components/income_expense_cards"
import { Share2 } from "lucide-react"
import { DatePickerWithRange } from "./components/date_range/date_range_picker"

export default function Dashboard() {
  const [type, setType] = useState("Line")

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  })
  const handleChange = (event) => {
    setType(event.target.value)
  }

  const hour = new Date().getHours()
  let greetings = ""

  if (hour < 12) {
    greetings = "Good Morning"
  } else if (hour < 18) {
    greetings = "Good Afternoon"
  } else {
    greetings = "Good Evening"
  }

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <div className="w-full h-full">
          <div className="w-full flex p-3 justify-between items-center">
            <div className="flex flex-col">
              <span className="text-themeonsurface text-lg">{greetings}</span>
              <span className="text-themeonsurface font-bold text-2xl">
                Swayam
              </span>
            </div>
            <div className="flex items-center gap-4 text-themeonsurface">
              <Share2 />
              <Avatar sx={{ bgcolor: blue[500] }}>S</Avatar>
            </div>
          </div>
          <div className="p-3">
            <DatePickerWithRange />
          </div>

          <div className="flex p-3 justify-between">
            <SummaryCard type="income" income={425637} />
            <SummaryCard type="expense" expenses={2387} />
          </div>

          <div className="w-full h-full p-3">
            <div className="bg-themesurfacedim rounded-3xl p-3 h-[45%] w-full flex flex-col justify-center gap-4">
              <div className="flex w-full justify-between items-center">
                <span className="text-themeonsurfacevar text-muted-foreground">
                  Overview:
                </span>
                <ChartSelect handleChange={handleChange} type={type} />
              </div>
              <div className="h-[80%]">
                {type == "Line" ? <LineChart /> : <BarChart />}
              </div>
            </div>
          </div>
        </div>
      </ThemeProvider>
    </>
  )
}
