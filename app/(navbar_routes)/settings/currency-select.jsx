"use client"
import React from "react"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import { currenciesAndIcons } from "@/enums/currencies-enum"

export default function CurrencySelect({
  setSelectedCurrency,
  selectedCurrency,
}) {
  return (
    <>
      <FormControl sx={{ width: "25%" }}>
        <Select
          sx={{
            height: 43,
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
          }}
          value={selectedCurrency}
          onChange={(evt) => {
            setSelectedCurrency(evt.target.value)
          }}
          displayEmpty
          renderValue={() => selectedCurrency}
        >
          {currenciesAndIcons.map((item, index) => {
            return (
              <MenuItem
                key={index}
                value={item.currencyCode}
                sx={{ display: "flex", gap: 1 }}
              >
                {" "}
                {item.currencyCode}
              </MenuItem>
            )
          })}
        </Select>
      </FormControl>
    </>
  )
}
