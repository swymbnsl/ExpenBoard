"use client"

import React, { useEffect, useState, useCallback, useMemo } from "react"
import { set } from "date-fns"
import { ThemeProvider } from "@emotion/react"
import { CssBaseline, createTheme } from "@mui/material"
import SummaryCard from "./components/income_expense_cards"
import { DatePickerWithRange } from "./components/date_range/date_range_picker"
import Header from "./components/header/header"
import TransactionsChart from "./components/transaction_charts/transactions_chart"
import CategoriesChart from "./components/categories_charts/categories_chart"
import axios from "axios"
import getTransactionsFromDate from "@/helpers/getTransactionsFromDate"
import { showErrorToast } from "@/utils/hot-toast"
import { Toaster } from "react-hot-toast"
import {
  categoriesChartsCalculation,
  transactionsChartCalculations,
} from "@/helpers/charts_calculations"

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [date, setDate] = useState({
    from: new Date(
      new Date(new Date().setDate(new Date().getDate() - 30)).setHours(
        0,
        0,
        0,
        0
      )
    ),
    to: new Date(),
  })
  const [displayDate, setDisplayDate] = useState({
    from: new Date(
      new Date(new Date().setDate(new Date().getDate() - 30)).setHours(
        0,
        0,
        0,
        0
      )
    ),
    to: new Date(),
  })
  const [isOpen, setIsOpen] = useState(false)
  const [userData, setUserData] = useState({})
  const [income, setIncome] = useState("")
  const [expenses, setExpenses] = useState("")
  const [eachDayTransactions, setEachDayTransactions] = useState([])
  const [noOfTransactionsOfEachCategory, setNoOfTransactionsOfEachCategory] =
    useState({})

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  })

  const handleOpen = useCallback((open) => {
    setIsOpen(open)
    if (!open && displayDate && displayDate.to && displayDate.from) {
      setDate((prevRange) => {
        return {
          ...prevRange,
          ["from"]: displayDate.from,
          ["to"]: set(displayDate.to, {
            hours: 23,
            minutes: 59,
            seconds: 59,
            milliseconds: 999,
          }),
        }
      })
    }
  })

  const getLocalDetails = async () => {
    try {
      const res = await axios.get("/api/user/profile")
      setUserData({
        name: res.data.tokenData.name,
        pfp: res.data.tokenData.pfp,
      })
    } catch (error) {
      showErrorToast("Error loading data")
      console.log(error.response.data.error)
    }
  }

  const getTransactions = async (date) => {
    try {
      const res = await getTransactionsFromDate(date)

      const { perDayTransactions, calculatedIncome, calculatedExpenses } =
        transactionsChartCalculations(res.transactions, date)
      setNoOfTransactionsOfEachCategory(categoriesChartsCalculation())
      setEachDayTransactions(perDayTransactions)
      setIncome(calculatedIncome)
      setExpenses(calculatedExpenses)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getLocalDetails()
  }, [])

  useEffect(() => {
    getTransactions(date)
  }, [date])

  if (isLoading) return <div>Loading....</div>

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Toaster />

        <div className="w-full h-full">
          {userData.name && <Header name={userData.name} pfp={userData.pfp} />}

          <div className="p-3">
            <DatePickerWithRange
              handleOpen={handleOpen}
              date={date}
              isOpen={isOpen}
              displayDate={displayDate}
              setDisplayDate={setDisplayDate}
            />
          </div>
          <div className="flex p-3 justify-between">
            <SummaryCard type="income" income={income} />
            <SummaryCard type="expense" expenses={expenses} />
          </div>

          <TransactionsChart eachDayTransactions={eachDayTransactions} />
          <CategoriesChart
            noOfTransactionsOfEachCategory={noOfTransactionsOfEachCategory}
          />
        </div>
      </ThemeProvider>
    </>
  )
}
