"use client"

import React, { useEffect, useState, useContext } from "react"
import { set } from "date-fns"

import SummaryCard from "./components/income_expense_cards"

import Header from "./components/header/header"
import TransactionsChart from "./components/transaction_charts/transactions_chart"
import CategoriesChart from "./components/categories_charts/categories_chart"
import getTransactionsFromDate from "@/helpers/getTransactionsFromDate"
import {
  categoriesChartsCalculation,
  transactionsChartCalculations,
} from "@/helpers/charts_calculations"
import { UserDetailsContext } from "@/context/userDetails"
import { DatePickerWithRange } from "@/components/shared/date_range_picker"
import { currenciesAndIcons } from "@/enums/currencies-enum"

export default function Dashboard() {
  const { name, pfp, currency } = useContext(UserDetailsContext)
  let symbol = ""
  if (currency) {
    const symbolArray = currenciesAndIcons.filter((i) => {
      return i["currencyCode"] == currency
    })
    symbol = symbolArray[0].icon
  }
  const [isLoading, setIsLoading] = useState(true)
  const [date, setDate] = useState({
    from: new Date(
      new Date(new Date().setDate(new Date().getDate() - 6)).setHours(
        0,
        0,
        0,
        0
      )
    ),
    to: new Date().setHours(23, 59, 59, 999),
  })
  const [displayDate, setDisplayDate] = useState({
    from: new Date(
      new Date(new Date().setDate(new Date().getDate() - 6)).setHours(
        0,
        0,
        0,
        0
      )
    ),
    to: new Date().setHours(23, 59, 59, 999),
  })
  const [isOpen, setIsOpen] = useState(false)
  const [income, setIncome] = useState("")
  const [expenses, setExpenses] = useState("")
  const [eachDayTransactions, setEachDayTransactions] = useState([])
  const [noOfTransactionsOfEachCategory, setNoOfTransactionsOfEachCategory] =
    useState({})

  const handleOpen = (open) => {
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
    getTransactions(date)
  }, [date])

  return (
    <>
      <div className="w-full h-full">
        <Header name={name} pfp={pfp} />

        <DatePickerWithRange
          handleOpen={handleOpen}
          date={date}
          isOpen={isOpen}
          displayDate={displayDate}
          setDisplayDate={setDisplayDate}
        />
        <div className="flex p-3 justify-between">
          <SummaryCard type="income" income={income} symbol={symbol} />
          <SummaryCard type="expense" expenses={expenses} symbol={symbol} />
        </div>

        <TransactionsChart
          eachDayTransactions={eachDayTransactions}
          isLoading={isLoading}
        />
        <div className="pb-24">
          <CategoriesChart
            noOfTransactionsOfEachCategory={noOfTransactionsOfEachCategory}
            isLoading={isLoading}
          />
        </div>
      </div>
    </>
  )
}
