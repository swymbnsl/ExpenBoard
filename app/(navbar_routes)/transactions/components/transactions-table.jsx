import React, { useContext, useEffect, useState } from "react"
import TransactionCard from "./transaction-card"
import { UserDetailsContext } from "@/context/userDetails"
import { currenciesAndIcons } from "@/enums/currencies-enum"
import getTransactionsFromDate from "@/helpers/getTransactionsFromDate"
import { format } from "date-fns"
import { TextField } from "@mui/material"
import {
  ArrowDownAZ,
  ArrowDownNarrowWide,
  ArrowDownWideNarrow,
  ArrowDownZA,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import TransactionDetailsCard from "./transaction-details-card"
import EditCreateTransactionsSheet from "./edit-create-transactions"

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
  const [sortBy, setSortBy] = useState({
    property: "dateAndTime",
    type: "descending",
  })
  const [searchTerm, setSearchTerm] = useState("")
  const [isSortPanelOpen, setIsSortPanelOpen] = useState()
  const [expandedTransactions, setExpandedTransaction] = useState("")

  const sortTransactions = (transactions, property, type) => {
    if (type == "descending") {
      if (property == "name" || property == "category") {
        return transactions
          .toSorted((a, b) => {
            if (a[property] < b[property]) {
              return -1
            }
            if (a[property] > b[property]) {
              return 1
            }
            return 0
          })
          .reverse()
      }
      return transactions.toSorted((a, b) =>
        property !== "dateAndTime"
          ? b[property] - a[property]
          : new Date(b[property]) - new Date(a[property])
      )
    } else {
      if (property == "name" || property == "category") {
        return transactions.toSorted((a, b) => {
          if (a[property] < b[property]) {
            return -1
          }
          if (a[property] > b[property]) {
            return 1
          }
          return 0
        })
      }
      return transactions.toSorted((a, b) =>
        property !== "dateAndTime"
          ? a[property] - b[property]
          : new Date(a[property]) - new Date(b[property])
      )
    }
  }

  const getTransactions = async (date) => {
    try {
      const { transactions } = await getTransactionsFromDate(date)
      setTransactions(transactions)
      const sortedTransactions = sortTransactions(
        transactions,
        "dateAndTime",
        "descending"
      )
      setDisplayTransactions(sortedTransactions)
    } catch (error) {
      console.log(error)
    }
  }

  const handleClick = () => {
    setIsSortPanelOpen(!isSortPanelOpen)
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

  useEffect(() => {
    const sortedTransactions = sortTransactions(
      transactions,
      sortBy.property,
      sortBy.type
    )
    setDisplayTransactions(sortedTransactions)
  }, [sortBy])

  const sortButtonClasses =
    " w-[43%] h-[50px] border-themeonsurfacedim hover:cursor-pointer border rounded-lg flex justify-between p-3 items-center font-semibold text-sm"

  return (
    <>
      <div className="w-full">
        <div className="mb-3 flex  justify-between items-center h-[55px]">
          <TextField
            sx={{
              width: "60%",

              "& .MuiOutlinedInput-notchedOutline": {
                borderRadius: 2,
              },

              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderRadius: 2,
              },

              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  borderRadius: 2,
                },
            }}
            name="search"
            value={searchTerm}
            onChange={handleSearchChange}
            id="outlined-controlled"
            label="Search"
          />
          <div
            className=" w-[37%] h-full bg-themesurfacedim hover:bg-themenavbar hover:cursor-pointer rounded-lg flex justify-between items-center font-semibold p-3"
            onClick={handleClick}
          >
            Sort By {isSortPanelOpen ? <ChevronUp /> : <ChevronDown />}
          </div>
        </div>
        <EditCreateTransactionsSheet symbol={symbol} />
        <div
          className={
            !isSortPanelOpen
              ? "hidden"
              : "flex py-3 w-full flex-col gap-3 justify-between"
          }
        >
          <div className="flex justify-evenly">
            <div
              onClick={() => {
                sortBy.property == "name" && sortBy.type == "descending"
                  ? setSortBy({
                      property: "name",
                      type: "ascending",
                    })
                  : setSortBy({
                      property: "name",
                      type: "descending",
                    })
              }}
              className={
                (sortBy.property == "name"
                  ? "bg-themeonsurface text-themesurface"
                  : "bg-transparent hover:bg-themesurfacedim text-themeonsurface") +
                sortButtonClasses
              }
            >
              Name{" "}
              {sortBy.property == "name" ? (
                sortBy.property == "name" && sortBy.type == "ascending" ? (
                  <ArrowDownAZ size={20} />
                ) : (
                  <ArrowDownZA size={20} />
                )
              ) : (
                <></>
              )}
            </div>
            <div
              onClick={() => {
                sortBy.property == "category" && sortBy.type == "descending"
                  ? setSortBy({
                      property: "category",
                      type: "ascending",
                    })
                  : setSortBy({
                      property: "category",
                      type: "descending",
                    })
              }}
              className={
                (sortBy.property == "category"
                  ? "bg-themeonsurface text-themesurface"
                  : "bg-transparent hover:bg-themesurfacedim text-themeonsurface") +
                sortButtonClasses
              }
            >
              Category
              {sortBy.property == "category" ? (
                sortBy.property == "category" && sortBy.type == "ascending" ? (
                  <ArrowDownAZ size={20} />
                ) : (
                  <ArrowDownZA size={20} />
                )
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="flex justify-evenly">
            <div
              onClick={() => {
                sortBy.property == "dateAndTime" && sortBy.type == "descending"
                  ? setSortBy({
                      property: "dateAndTime",
                      type: "ascending",
                    })
                  : setSortBy({
                      property: "dateAndTime",
                      type: "descending",
                    })
              }}
              className={
                (sortBy.property == "dateAndTime"
                  ? "bg-themeonsurface text-themesurface"
                  : "bg-transparent hover:bg-themesurfacedim text-themeonsurface") +
                sortButtonClasses
              }
            >
              Date
              {sortBy.property == "dateAndTime" ? (
                sortBy.property == "dateAndTime" &&
                sortBy.type == "ascending" ? (
                  <ArrowDownNarrowWide size={20} />
                ) : (
                  <ArrowDownWideNarrow size={20} />
                )
              ) : (
                <></>
              )}
            </div>
            <div
              onClick={() => {
                sortBy.property == "amount" && sortBy.type == "descending"
                  ? setSortBy({
                      property: "amount",
                      type: "ascending",
                    })
                  : setSortBy({
                      property: "amount",
                      type: "descending",
                    })
              }}
              className={
                (sortBy.property == "amount"
                  ? "bg-themeonsurface text-themesurface"
                  : "bg-transparent hover:bg-themesurfacedim text-themeonsurface") +
                sortButtonClasses
              }
            >
              Amount
              {sortBy.property == "amount" ? (
                sortBy.property == "amount" && sortBy.type == "ascending" ? (
                  <ArrowDownNarrowWide size={20} />
                ) : (
                  <ArrowDownWideNarrow size={20} />
                )
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>

        <div className="h-full w-full flex flex-col gap-3">
          {displayTransactions.map((t) => {
            return t._id !== expandedTransactions ? (
              <TransactionCard
                key={t._id}
                id={t._id}
                setExpandedTransaction={setExpandedTransaction}
                type={t.type}
                name={t.name}
                amount={`${symbol} ${t.amount}`}
                category={t.category}
                date={format(t.dateAndTime, "dd/MM/yy")}
                time={format(t.dateAndTime, "hh:mm aaa")}
              />
            ) : (
              <TransactionDetailsCard
                key={t._id}
                setExpandedTransaction={setExpandedTransaction}
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
      </div>
    </>
  )
}
