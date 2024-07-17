import React, { useContext } from "react"
import TransactionCard from "./transaction-card"
import { UserDetailsContext } from "@/context/userDetails"
import { currenciesAndIcons } from "@/enums/currencies-enum"

export default function TransactionsTable() {
  const { currency } = useContext(UserDetailsContext)
  let symbol = ""
  if (currency) {
    const symbolArray = currenciesAndIcons.filter((i) => {
      return i["currencyCode"] == currency
    })
    symbol = symbolArray[0].icon
  }

  return (
    <>
      <div className="h-full w-full flex flex-col gap-3">
        <TransactionCard
          type="income"
          name="Stationary"
          amount={`${symbol} 99`}
          category="Grocery"
          date="17/7/24"
          time="12:59 pm"
        />
        <TransactionCard
          type="income"
          name="Stationary"
          amount={`${symbol} 99`}
          category="Grocery"
          date="17/7/24"
          time="12:59 pm"
        />
        <TransactionCard
          type="income"
          name="Stationary"
          amount={`${symbol} 99`}
          category="Grocery"
          date="17/7/24"
          time="12:59 pm"
        />
        <TransactionCard
          type="income"
          name="Stationary"
          amount={`${symbol} 99`}
          category="Grocery"
          date="17/7/24"
          time="12:59 pm"
        />
        <TransactionCard
          type="income"
          name="Stationary"
          amount={`${symbol} 99`}
          category="Grocery"
          date="17/7/24"
          time="12:59 pm"
        />
        <TransactionCard
          type="income"
          name="Stationary"
          amount={`${symbol} 99`}
          category="Grocery"
          date="17/7/24"
          time="12:59 pm"
        />
        <TransactionCard
          type="income"
          name="Stationary"
          amount={`${symbol} 99`}
          category="Grocery"
          date="17/7/24"
          time="12:59 pm"
        />
      </div>
    </>
  )
}
