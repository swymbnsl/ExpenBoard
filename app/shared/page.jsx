"use client"
import { transactionsChartCalculations } from "@/helpers/charts_calculations"
import axios from "axios"
import { useSearchParams } from "next/navigation"
import React, { Suspense, useCallback, useEffect, useState } from "react"
import SummaryCard from "../(userDetailContext-routes)/(navbar_routes)/dashboard/components/income_expense_cards"
import { currenciesAndIcons } from "@/enums/currencies-enum"
import TransactionsTable from "./transactions"

function Shared() {
  const [uriDirect, setUriDirect] = useState(false)
  const [income, setIncome] = useState("")
  const [expenses, setExpenses] = useState("")
  const [userData, setUserData] = useState({})
  const [resData, setResData] = useState(undefined)
  useState({})
  const [symbol, setSymbol] = useState("")

  const searchParams = useSearchParams()

  const queryParamsArray = Array.from(searchParams.entries()).map(
    ([key, value]) => ({
      key,
      value,
    })
  )
  const u = searchParams.get("u")
  const s = searchParams.get("s")
  const e = searchParams.get("e")

  const [date, setDate] = useState({
    from: new Date(s),
    to: new Date(e),
  })

  const getUserTransactions = useCallback(async (userId, start, end) => {
    try {
      const res = await axios.get(
        `/api/shared-transactions?u=${userId}&s=${start}&e=${end}`
      )
      setResData(res.data)
      const { calculatedIncome, calculatedExpenses } =
        transactionsChartCalculations(res.data.transactions, date)
      setIncome(calculatedIncome)
      setExpenses(calculatedExpenses)
      setUserData({ name: res.data.name, currency: res.data.currency })
    } catch (error) {
      console.log(error)
      setUriDirect(true)
    }
  }, [])

  useEffect(() => {
    if (
      !queryParamsArray.length ||
      queryParamsArray[0].value.length === 0 ||
      queryParamsArray[1].value.length === 0 ||
      queryParamsArray[2].value.length === 0
    ) {
      setUriDirect(true)
      return
    }
    getUserTransactions(u, s, e)
  }, [])

  useEffect(() => {
    if (userData.currency) {
      const symbolArray = currenciesAndIcons.filter((i) => {
        return i["currencyCode"] == userData.currency
      })
      setSymbol(symbolArray[0].icon)
    }
  }, [userData])

  return uriDirect ? (
    <>
      <div className="p-10 text-center h-full w-full flex justify-center items-center">
        Invalid URL. Make sure you are on the correct shared URI
      </div>
    </>
  ) : (
    <>
      <div className="w-full h-full flex flex-col items-center">
        <div className="p-3 w-full">
          <span className="text-themeonsurface font-bold text-2xl">
            Swayam&apos;s Overview
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
          {resData && (
            <TransactionsTable date={date} symbol={symbol} resData={resData} />
          )}
        </div>{" "}
      </div>
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
