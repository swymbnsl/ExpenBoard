import React, { useCallback, useContext, useEffect, useState } from "react"
import TransactionCard from "./transaction-card"
import { UserDetailsContext } from "@/context/userDetails"
import { currenciesAndIcons } from "@/enums/currencies-enum"
import getTransactionsFromDate from "@/helpers/getTransactionsFromDate"
import { format } from "date-fns"
import { CircularProgress, Fab, TextField } from "@mui/material"
import { ChevronDown, ChevronUp, Plus } from "lucide-react"
import TransactionDetailsCard from "./transaction-details-card"
import EditCreateTransactionsSheet from "./Edit-create-transaction-sheet/edit_create_transactions"
import DeleteConfirmationDialog from "../../../../../components/shared/delete_confirmation_dialog"
import axios from "axios"
import { showErrorToast, showSuccessToast } from "@/utils/hot-toast"
import { textFieldSx } from "@/components/styles-sx/textfield_sx"
import SortByCategory from "./sortby_category"

export default function TransactionsTable({ date }) {
  const { currency } = useContext(UserDetailsContext)
  let symbol = ""
  if (currency) {
    const symbolArray = currenciesAndIcons.filter((i) => {
      return i["currencyCode"] == currency
    })
    symbol = symbolArray[0].icon
  }
  const [isLoading, setIsLoading] = useState(true)
  const [transactions, setTransactions] = useState([])
  const [displayTransactions, setDisplayTransactions] = useState([])
  const [sortBy, setSortBy] = useState({
    property: "dateAndTime",
    descending: true,
  })
  const [searchTerm, setSearchTerm] = useState("")
  const [isSortPanelOpen, setIsSortPanelOpen] = useState()
  const [expandedTransactions, setExpandedTransaction] = useState("")
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [type, setType] = useState("create")
  const [editTransactionFields, setEditTransactionFields] = useState({})
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [isDeleteDisabled, setIsDeleteDisabled] = useState(false)
  const [deleteID, setDeleteID] = useState("")

  const sortTransactions = (transactions, property, descending) => {
    if (descending) {
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

  const getTransactions = useCallback(
    async (date) => {
      try {
        setSearchTerm("")
        const { transactions } = await getTransactionsFromDate(date)
        setTransactions(transactions)
        const sortedTransactions = sortTransactions(
          transactions,
          sortBy.property,
          sortBy.descending
        )
        setDisplayTransactions(sortedTransactions)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    },
    [sortBy.property, sortBy.descending]
  )

  const deleteClickFunction = async () => {
    setIsDeleteDisabled(true)
    await handleDelete(deleteID)
    setIsDeleteDisabled(false)
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

  const handleDelete = async (deleteID) => {
    try {
      const res = await axios.delete(`/api/user/transactions?id=${deleteID}`)
      showSuccessToast(res.data.message)
      getTransactions(date)
    } catch (error) {
      console.log(error)
      showErrorToast(error.response.data.error)
    } finally {
      setDeleteDialogOpen(false)
    }
  }

  useEffect(() => {
    getTransactions(date)
  }, [date, isSheetOpen, getTransactions])

  useEffect(() => {
    const sortedTransactions = sortTransactions(
      transactions,
      sortBy.property,
      sortBy.descending
    )
    setDisplayTransactions(sortedTransactions)
  }, [sortBy, transactions])

  return (
    <>
      <div className="fixed bottom-[90px] right-3">
        {isSheetOpen || deleteDialogOpen || isLoading ? (
          <></>
        ) : (
          <Fab
            onClick={() => {
              setType("create")
              setIsSheetOpen(true)
            }}
            variant="extended"
            color="white"
            aria-label="add"
            className="bg-themeonsurface text-lg font-semibold text-themesurface shadow-black shadow-[0_0_30px_2px]"
          >
            <Plus style={{ marginRight: "10px" }} strokeWidth={3} size={20} />
            Add
          </Fab>
        )}
      </div>

      <div className="w-full pb-24">
        <div className="mb-3 flex  justify-between items-center h-[55px]">
          <TextField
            sx={{
              width: "60%",
              ...textFieldSx,
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
            Sort by {isSortPanelOpen ? <ChevronUp /> : <ChevronDown />}
          </div>
        </div>

        <EditCreateTransactionsSheet
          editTransactionFields={editTransactionFields}
          type={type}
          setIsSheetOpen={setIsSheetOpen}
          isSheetOpen={isSheetOpen}
          symbol={symbol}
        />
        <DeleteConfirmationDialog
          title="Delete this transaction?"
          description="Once deleted, you won't be able to recover it..!"
          deleteClickFunction={deleteClickFunction}
          isDeleteDisabled={isDeleteDisabled}
          setDeleteDialogOpen={setDeleteDialogOpen}
          deleteDialogOpen={deleteDialogOpen}
        />
        <div
          className={
            !isSortPanelOpen
              ? "hidden"
              : "flex py-3 w-full flex-col gap-3 justify-between"
          }
        >
          <div className="flex justify-evenly">
            <SortByCategory
              propertyName="name"
              setSortBy={setSortBy}
              sortBy={sortBy}
            />
            <SortByCategory
              propertyName="category"
              setSortBy={setSortBy}
              sortBy={sortBy}
            />
          </div>
          <div className="flex justify-evenly">
            <SortByCategory
              propertyName="dateAndTime"
              setSortBy={setSortBy}
              sortBy={sortBy}
            />
            <SortByCategory
              propertyName="amount"
              setSortBy={setSortBy}
              sortBy={sortBy}
            />
          </div>
        </div>

        <div className="h-full w-full flex flex-col gap-3">
          {isLoading ? (
            <div className="flex justify-center w-full items-center h-[70vh]">
              <CircularProgress />
            </div>
          ) : displayTransactions.length > 0 ? (
            displayTransactions.map((t) => {
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
                  setDeleteID={setDeleteID}
                  isSheetOpen={isSheetOpen}
                  setIsSheetOpen={setIsSheetOpen}
                  setDeleteDialogOpen={setDeleteDialogOpen}
                  setType={setType}
                  key={t._id}
                  id={t._id}
                  setExpandedTransaction={setExpandedTransaction}
                  type={t.type}
                  name={t.name}
                  symbol={symbol}
                  amount={t.amount}
                  category={t.category}
                  dateAndTime={t.dateAndTime}
                  date={format(t.dateAndTime, "dd/MM/yy")}
                  time={format(t.dateAndTime, "hh:mm aaa")}
                  setEditTransactionFields={setEditTransactionFields}
                />
              )
            })
          ) : (
            <div className="flex h-[70vh] justify-center items-center">
              <i className="text-themeonsurfacevar">No transactions found</i>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
