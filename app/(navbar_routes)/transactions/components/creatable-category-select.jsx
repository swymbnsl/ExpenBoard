import { TextField } from "@mui/material"
import React, { useState } from "react"

export default function CategorySelect({ disabled }) {
  const [value, setValue] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const categories = [
    { name: "one", type: "income" },
    { name: "two", type: "income" },
    { name: "three", type: "income" },
    { name: "four", type: "income" },
    { name: "five", type: "expense" },
    { name: "six", type: "expense" },
    { name: "seven", type: "expense" },
    { name: "eight", type: "expense" },
  ]

  const handleCatergorySearchChange = (evt) => setValue(evt.target.value)

  const handleBlur = (e) => {
    const currentTarget = e.currentTarget

    requestAnimationFrame(() => {
      if (!currentTarget.contains(document.activeElement)) {
        if (value !== selectedCategory) {
          setValue(selectedCategory)
        }
        setIsOpen(false)
      }
    })
  }

  return (
    <>
      <div className="w-full relative" onBlur={handleBlur} tabIndex={-1}>
        <TextField
          disabled={disabled}
          helperText={disabled ? "Select transaction type first" : ""}
          fullWidth
          sx={{
            "& .MuiOutlinedInput-notchedOutline": {
              borderRadius: 2,
            },

            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderRadius: 2,
            },

            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderRadius: 2,
              },
          }}
          name="category"
          value={value}
          onChange={handleCatergorySearchChange}
          onFocus={() => setIsOpen(true)}
          id="outlined-category"
          label="Category"
        />
        <div
          className={
            (!isOpen ? "hidden " : " ") +
            "w-full bg-themesurface absolute flex flex-col p-3 gap-1 text-themeonsurface font-medium rounded-b-lg"
          }
        >
          {categories.map((c, index) => {
            if (c.name.toLowerCase().includes(value.toLowerCase())) {
              return (
                <span
                  key={index}
                  onClick={() => {
                    setValue(c.name)
                    setSelectedCategory(c.name)
                    setIsOpen(false)
                  }}
                  className="hover:cursor-pointer hover:bg-themesurfacedim"
                >
                  {" "}
                  {c.name}{" "}
                </span>
              )
            }
          })}
          {categories.filter((c) =>
            c.name.toLowerCase().includes(value.toLowerCase())
          ).length == 0 ? (
            <span
              className="hover:cursor-pointer hover:bg-themesurfacedim"
              onClick={() => {
                setIsDialogOpen(true)
              }}
            >
              {" "}
              Add {value}{" "}
            </span>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  )
}
