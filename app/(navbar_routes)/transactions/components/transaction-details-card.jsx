import { showErrorToast, showSuccessToast } from "@/utils/hot-toast"
import { Button } from "@mui/material"
import axios from "axios"
import { ChevronLeft, TrendingDown, TrendingUp } from "lucide-react"

export default function TransactionCard({
  getTransactions,
  datePickerDate,
  setEditTransactionFields,
  setType,
  setIsSheetOpen,
  setExpandedTransaction,
  type,
  name,
  id,
  symbol,
  amount,
  category,
  date,
  time,
  dateAndTime,
}) {
  const handleDelete = async () => {
    try {
      const res = await axios.delete(`/api/user/transactions?id=${id}`)
      showSuccessToast(res.data.message)
      getTransactions(datePickerDate)
    } catch (error) {
      console.log(error)
      showErrorToast(error.response.data.error)
    }
  }

  return (
    <>
      <div className="bg-themesurfacedim w-full rounded-2xl flex flex-col gap-5 justify-between min-h-[130px] p-3 mb-3">
        <span
          onClick={() => setExpandedTransaction("")}
          className="bg-transparent hover:cursor-pointer hover:border-white border border-white/20 rounded-lg p-1 w-[33px] flex justify-center items-center"
        >
          {" "}
          <ChevronLeft />{" "}
        </span>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 w-1/2 ">
            <div className="flex flex-col w-full">
              <span className="text-themeonsurface font-bold text-lg break-words">
                {name}
              </span>
              <span className=" text-muted-foreground font-semibold text-sm break-words">
                {category}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span
              className={
                (type == "income" ? "text-green-300" : "text-red-300") +
                " font-bold text-lg"
              }
            >
              {symbol + " " + amount}
            </span>
            <div className="flex gap-2 ">
              <span className=" text-muted-foreground font-semibold text-sm">
                {date}
              </span>
              <span className=" text-muted-foreground font-semibold text-sm">
                {time}
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <Button
            onClick={handleDelete}
            variant="contained"
            color="error"
            sx={{ width: "45%" }}
          >
            Delete
          </Button>
          <Button
            onClick={() => {
              setType("edit")
              setEditTransactionFields({
                id: id,
                name: name,
                amount: amount,
                type: type,
                category: category,
                dateAndTime: dateAndTime,
              })
              setIsSheetOpen(true)
            }}
            variant="contained"
            sx={{ width: "45%" }}
          >
            Edit
          </Button>
        </div>
      </div>
    </>
  )
}
