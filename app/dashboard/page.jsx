"use client"
import { Avatar } from "@mui/material"
import { blue } from "@mui/material/colors"
import { BarChart3Icon, LineChartIcon, Share2 } from "lucide-react"
import React, { useState } from "react"
import LineChart from "./LineChart"
import BarChart from "./BarChart"
import { ThemeProvider } from "@emotion/react"
import { CssBaseline, createTheme } from "@mui/material"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import CountUp from "react-countup"

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

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <div className="w-full h-full">
          <div className="w-full flex p-3 justify-between items-center">
            <div className="flex flex-col">
              <span className="text-themeonsurface text-lg">Good Evening</span>
              <span className="text-themeonsurface font-bold text-2xl">
                Swayam
              </span>
            </div>
            <div className="flex items-center gap-4 text-themeonsurface">
              <Share2 />
              <Avatar sx={{ bgcolor: blue[500] }}>S</Avatar>
            </div>
          </div>

          <div className="flex p-3 justify-between">
            <div className=" bg-green-300 rounded-3xl flex flex-col justify-center w-[48%] px-3 h-24 gap-1">
              <span className="text-black text-xs">Income this month</span>
              <span className="text-black font-extrabold text-2xl">
                ₹<CountUp end={40000} preserveValue />
              </span>
            </div>
            <div className=" bg-red-300 rounded-3xl flex flex-col justify-center w-[48%] px-3 h-24 gap-1">
              <span className="text-black text-xs">Expenses this month</span>
              <span className="text-black font-extrabold text-2xl">
                ₹
                <CountUp end={2000} preserveValue useIndianSeparators />
              </span>
            </div>
          </div>

          <div className="w-full h-full p-3">
            <div className="bg-themesurfacedim rounded-3xl p-3 h-[45%] w-full flex flex-col justify-center gap-4">
              <div className="flex w-full justify-between items-center">
                <span className="text-themeonsurfacevar text-muted-foreground">
                  Weekly Overview:
                </span>
                <FormControl sx={{ m: 1, minWidth: 90 }}>
                  <Select
                    sx={{
                      borderRadius: 2,
                    }}
                    value={type}
                    onChange={handleChange}
                    displayEmpty
                    renderValue={() => type}
                  >
                    <MenuItem value={"Line"} sx={{ display: "flex", gap: 1 }}>
                      {" "}
                      <LineChartIcon /> Line
                    </MenuItem>
                    <MenuItem value={"Bar"} sx={{ display: "flex", gap: 1 }}>
                      {" "}
                      <BarChart3Icon /> Bar
                    </MenuItem>
                  </Select>
                </FormControl>
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
