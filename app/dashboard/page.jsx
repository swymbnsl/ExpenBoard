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

export default function Dashboard() {
  const [date, setDate] = useState({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
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
      console.log(error.response.data.error)
    }
  }
  const getTransactions = async () => {
    try {
      const res = await axios.get("/api/user/transactions")
      setTransactions(res.data.transactions)
    } catch (error) {
      console.log(error.response.data.error)
    }
  }

  useEffect(() => {
    getLocalDetails()
    getTransactions()
  }, [])

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />

        <div className="w-full h-full">
          <Header name={name} />

          <div className="p-3">
            <DatePickerWithRange
              handleOpen={handleOpen}
              date={date}
              isOpen={isOpen}
              setDate={setDate}
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
