"use client"
import React, { useState } from "react"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import { BarChart3Icon, LineChartIcon } from "lucide-react"

export default function ChartSelect({ handleChange, type }) {
  return (
    <>
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
    </>
  )
}
