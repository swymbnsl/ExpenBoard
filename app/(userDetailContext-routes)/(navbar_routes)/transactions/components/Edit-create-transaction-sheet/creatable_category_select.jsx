import { showSuccessToast } from "@/utils/hot-toast"
import { TextField } from "@mui/material"
import axios from "axios"
import React, { useCallback, useEffect, useRef, useState } from "react"

export default function CategorySelect({
  isExpense,
  setInputs,
  inputs,
  error,
  helperText,
}) {
  const [value, setValue] = useState(inputs.category)
  const [incomeCategories, setIncomeCategories] = useState([])
  const [expensesCategories, setExpensesCategories] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const isFirstRender = useRef(0)

  const getCategories = async () => {
    try {
      const res = await axios.get("/api/user/categories")
      setIncomeCategories(res.data.incomeCategories)
      setExpensesCategories(res.data.expensesCategories)
    } catch (error) {
      console.log(error)
    }
  }

  const handleCatergorySearchChange = (evt) => setValue(evt.target.value)

  const setCategory = useCallback(
    (selectedCategory) => {
      setInputs((prev) => {
        return {
          ...prev,
          ["category"]: selectedCategory,
        }
      })
    },
    [setInputs]
  )

  const handleBlur = (e) => {
    const currentTarget = e.currentTarget

    requestAnimationFrame(() => {
      if (!currentTarget.contains(document.activeElement)) {
        if (value !== inputs.category) {
          setValue(inputs.category)
        }
        setIsOpen(false)
      }
    })
  }

  let categories = []
  categories = isExpense ? [...expensesCategories] : [...incomeCategories]

  useEffect(() => {
    if (isFirstRender.current == 1) {
      setValue("")
      setCategory("")
    } else {
      isFirstRender.current += 1
      return
    }
  }, [isExpense, setCategory])

  useEffect(() => {
    getCategories()
  }, [])

  const borderRadiusValues = isOpen ? "8px 8px 0 0" : 2
  return (
    <>
      <div className="w-[80%] relative" onBlur={handleBlur} tabIndex={-1}>
        <TextField
          fullWidth
          sx={{
            "& .MuiOutlinedInput-notchedOutline": {
              borderRadius: borderRadiusValues,
            },

            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderRadius: borderRadiusValues,
            },

            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderRadius: borderRadiusValues,
              },
          }}
          name="category"
          value={value}
          onChange={handleCatergorySearchChange}
          onFocus={() => setIsOpen(true)}
          id="outlined-category"
          label={isExpense ? "Expense category" : "Income category"}
          error={error ? true : false}
          helperText={helperText}
        />
        <div
          className={
            (!isOpen ? "hidden " : " ") +
            "w-full max-h-[200px] bg-themenavbar absolute flex flex-col p-3 gap-1 text-themeonsurface font-medium rounded-b-lg overflow-y-scroll"
          }
        >
          {categories.map((c, index) => {
            if (c.toLowerCase().includes(value.toLowerCase())) {
              return (
                <span
                  key={index}
                  onClick={() => {
                    setValue(c)
                    setCategory(c)
                    setIsOpen(false)
                  }}
                  className="hover:cursor-pointer hover:bg-themesurfacedim"
                >
                  {" "}
                  {c}{" "}
                </span>
              )
            }
          })}
          {categories.filter((c) =>
            c.toLowerCase().includes(value.toLowerCase())
          ).length == 0 ? (
            <span
              className="hover:cursor-pointer hover:bg-themesurfacedim"
              onClick={() => {
                setCategory(value)
                setIsOpen(false)
                showSuccessToast(
                  `New ${
                    isExpense ? "Expense category" : "Income category"
                  } will be created`
                )
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
