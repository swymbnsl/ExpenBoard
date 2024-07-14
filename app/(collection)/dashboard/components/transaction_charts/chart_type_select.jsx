"use client"
import React from "react"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import { AreaChartIcon, BarChart3Icon } from "lucide-react"

export default function ChartSelect({ handleChange, type }) {
  return (
    <>
      <FormControl sx={{ m: 1, minWidth: 110 }}>
        <Select
          sx={{
            borderRadius: 2,
          }}
          value={type}
          onChange={handleChange}
          displayEmpty
          renderValue={() => {
            if (type == "Area") {
              return (
                <span className="flex justify-center items-center gap-2">
                  {" "}
                  <AreaChartIcon size={18} /> Area{" "}
                </span>
              )
            }
            return (
              <span className="flex justify-center items-center gap-2">
                {" "}
                <BarChart3Icon size={18} /> Bar{" "}
              </span>
            )
          }}
        >
          <MenuItem value={"Area"} sx={{ display: "flex", gap: 1 }}>
            {" "}
            <AreaChartIcon /> Area
          </MenuItem>
          <MenuItem value={"Bar"} sx={{ display: "flex", gap: 1 }}>
            {" "}
            <BarChart3Icon /> Bar
          </MenuItem>
        </Select>
      </FormControl>
    </>
  )
}
