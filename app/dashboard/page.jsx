"use client"

import React, { useEffect, useState } from "react"

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

export default function Dashboard() {
  const [date, setDate] = useState({
    from: new Date(new Date().setDate(new Date().getDate() - 30)).setHours(
      0,
      0,
      0,
      0
    ),
    to: new Date(),
  })
  const [displayDate, setDisplayDate] = useState({
    from: new Date(new Date().setDate(new Date().getDate() - 30)).setHours(
      0,
      0,
      0,
      0
    ),
    to: new Date(),
  })
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState("")
  const [transactions, setTransactions] = useState([])

  const handleOpen = (open) => {
    setIsOpen(open)
  }

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  })

  const getLocalDetails = async () => {
    try {
      const res = await axios.get("/api/user/profile")
      setName(res.data.tokenData.name)
    } catch (error) {
      showErrorToast("Error loading data")
      console.log(error.response.data.error)
    }
  }
  const getTransactions = async (date) => {
    try {
      const res = await getTransactionsFromDate(date)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getLocalDetails()
    getTransactions(date)
  }, [])

  useEffect(() => {
    getTransactions(date)
  }, [date])

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Toaster />

        <div className="w-full h-full">
          <Header name={name} />

          <div className="p-3">
            <DatePickerWithRange
              handleOpen={handleOpen}
              date={date}
              isOpen={isOpen}
              setDate={setDate}
              displayDate={displayDate}
              setDisplayDate={setDisplayDate}
            />
          </div>
          <div className="flex p-3 justify-between">
            <SummaryCard type="income" income={425637} />
            <SummaryCard type="expense" expenses={2387} />
          </div>

          <TransactionsChart />
          <CategoriesChart />
        </div>
      </ThemeProvider>
    </>
  )
}
