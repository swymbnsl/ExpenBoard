"use client"
import { transactionsChartCalculations } from "@/helpers/charts_calculations"
import axios from "axios"
import { useSearchParams } from "next/navigation"
import React, { Suspense, useCallback, useEffect, useState } from "react"
import SummaryCard from "../(userDetailContext-routes)/(navbar_routes)/dashboard/components/income_expense_cards"
import { currenciesAndIcons } from "@/enums/currencies-enum"
import TransactionsTable from "./transactions"
import { CircularProgress } from "@mui/material"

function Shared() {
  const [income, setIncome] = useState("")
  const [expenses, setExpenses] = useState("")
  const [userData, setUserData] = useState({})
  const [resData, setResData] = useState(undefined)
  useState({})
  const [symbol, setSymbol] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  const searchParams = useSearchParams()

  const t = searchParams.get("t")

  const getUserTransactions = useCallback(async (t) => {
    try {
      const res = await axios.get(`/api/shared-transactions?t=${t}`)
      setResData(res.data)
      const { calculatedIncome, calculatedExpenses } =
        transactionsChartCalculations(res.data.transactions, res.data.date)
      setIncome(calculatedIncome)
      setExpenses(calculatedExpenses)
      setUserData({ name: res.data.name, currency: res.data.currency })
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (userData.currency) {
      const symbolArray = currenciesAndIcons.filter((i) => {
        return i["currencyCode"] == userData.currency
      })
      setSymbol(symbolArray[0].icon)
    }
  }, [userData])

  useEffect(() => {
    getUserTransactions(t)
  }, [])

  return (
    <>
      {isLoading ? (
        <div className="h-screen w-screen flex justify-center items-center">
          <CircularProgress />
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center">
          <div className="p-3 w-full">
            <span className="text-themeonsurface font-bold text-2xl">
              {userData.name.length <= 8 ? userData.name : "User"}&apos;s
              Overview
            </span>{" "}
          </div>
          <div className="flex w-full p-3 justify-between">
            <SummaryCard type="income" income={income} symbol={symbol} />
            <SummaryCard type="expense" expenses={expenses} symbol={symbol} />
          </div>
          <div className="p-3 w-full">
            <span className="text-themeonsurface font-bold text-xl">
              Transactions
            </span>{" "}
          </div>
          <div className="p-3 w-full h-full justify-center items-center">
            {resData && <TransactionsTable symbol={symbol} resData={resData} />}
          </div>{" "}
        </div>
      )}
    </>
  )
}

// Wrapping the component in Suspense
export default function SharedWithSuspense() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
      <Shared />
    </Suspense>
  )
}
