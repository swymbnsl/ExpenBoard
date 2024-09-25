import React, { useCallback, useEffect, useState } from "react"
import getTransactionsFromDate from "@/helpers/getTransactionsFromDate"
import { format } from "date-fns"
import { CircularProgress } from "@mui/material"
import TransactionCard from "./transactionCard"

export default function TransactionsTable({ date, symbol, resData }) {
  console.log(resData)
  const [isLoading, setIsLoading] = useState(true)
  const [displayTransactions, setDisplayTransactions] = useState([])

  useEffect(() => {
    setDisplayTransactions(resData.transactions)
    setIsLoading(false)
  }, [resData])

  return (
    <>
      <div className="h-full w-full flex flex-col gap-3">
        {isLoading ? (
          <div className="flex justify-center w-full items-center h-[70vh]">
            <CircularProgress />
          </div>
        ) : (
          displayTransactions.map((t) => {
            return (
              <TransactionCard
                key={t._id}
                id={t._id}
                type={t.type}
                name={t.name}
                amount={`${symbol} ${t.amount}`}
                category={t.category}
                date={format(t.dateAndTime, "dd/MM/yy")}
                time={format(t.dateAndTime, "hh:mm aaa")}
              />
            )
          })
        )}
      </div>
    </>
  )
}
