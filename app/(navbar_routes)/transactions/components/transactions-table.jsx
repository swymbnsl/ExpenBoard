import React, { useContext, useEffect, useState } from "react"
import TransactionCard from "./transaction-card"
import { UserDetailsContext } from "@/context/userDetails"
import { currenciesAndIcons } from "@/enums/currencies-enum"
import getTransactionsFromDate from "@/helpers/getTransactionsFromDate"
import { format } from "date-fns"
import { TextField } from "@mui/material"

export default function TransactionsTable({ date }) {
  const { currency } = useContext(UserDetailsContext)
  let symbol = ""
  if (currency) {
    const symbolArray = currenciesAndIcons.filter((i) => {
      return i["currencyCode"] == currency
    })
    symbol = symbolArray[0].icon
  }

  const [transactions, setTransactions] = useState([])
  const [displayTransactions, setDisplayTransactions] = useState([])
  const [sortBy, setSortBy] = useState("dateAndTime")
  const [searchTerm, setSearchTerm] = useState("")

  const sortTransactions = (transactions, property) => {
    return transactions.toSorted((a, b) =>
      property !== "dateAndTime"
        ? b[property] - a[property]
        : new Date(b[property]) - new Date(a[property])
    )
  }

  const getTransactions = async (date) => {
    try {
      const { transactions } = await getTransactionsFromDate(date)
      setTransactions(transactions)
      const sortedTransactions = sortTransactions(transactions, sortBy)
      setDisplayTransactions(sortedTransactions)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSearchChange = (evt) => {
    setSearchTerm(evt.target.value)
    setDisplayTransactions(
      transactions.filter(
        (t) =>
          t["name"].toLowerCase().includes(evt.target.value.toLowerCase()) ||
          t["category"]
            .toLowerCase()
            .includes(evt.target.value.toLowerCase()) ||
          t["amount"].toString().includes(evt.target.value)
      )
    )
  }
  useEffect(() => {
    getTransactions(date)
  }, [date])

  return (
    <>
      <div className="mb-3 justify-center items-center">
        <TextField
          fullWidth="true"
          name="search"
          value={searchTerm}
          onChange={handleSearchChange}
          id="outlined-controlled"
          label="Search by name, category or amount"
        />
      </div>{" "}
      <div className="h-full w-full flex flex-col gap-3">
        {displayTransactions.map((t, index) => {
          return (
            <TransactionCard
              key={index}
              type={t.type}
              name={t.name}
              amount={`${symbol} ${t.amount}`}
              category={t.category}
              date={format(t.dateAndTime, "dd/MM/yy")}
              time={format(t.dateAndTime, "hh:mm aaa")}
            />
          )
        })}
      </div>
    </>
  )
}
