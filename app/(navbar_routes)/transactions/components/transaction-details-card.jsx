import DeleteButton from "@/components/buttons/delete_button"
import PrimaryButton from "@/components/buttons/primary_button"
import { ChevronLeft } from "lucide-react"

export default function TransactionCard({
  setDeleteID,
  setDeleteDialogOpen,

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
  const handleEdit = () => {
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
  }

  const handleDelete = () => {
    setDeleteDialogOpen(true)
    setDeleteID(id)
  }

  return (
    <>
      <div className="bg-themesurfacedim w-full rounded-2xl flex flex-col justify-between min-h-[180px] p-3 py-4 mb-3">
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
          <DeleteButton
            clickFunction={handleDelete}
            disabled={false}
            width="45%"
            height="40px"
            buttonText={"Delete"}
          />

          <PrimaryButton
            clickFunction={handleEdit}
            width="45%"
            height="40px"
            buttonText={"Edit"}
          />
        </div>
      </div>
    </>
  )
}
