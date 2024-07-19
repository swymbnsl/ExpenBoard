import { Button } from "@mui/material"
import { ChevronLeft, TrendingDown, TrendingUp } from "lucide-react"

export default function TransactionCard({
  setExpandedTransaction,
  type,
  name,
  amount,
  category,
  date,
  time,
}) {
  return (
    <>
      <div className="bg-themesurfacedim w-full rounded-2xl flex flex-col gap-5 justify-between min-h-[130px] p-3 mb-3">
        <span
          onClick={() => setExpandedTransaction("")}
          className="bg-transparent border border-white/20 rounded-lg p-1 w-[33px] flex justify-center items-center"
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
              {amount}
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
          <Button variant="contained" color="error" sx={{ width: "45%" }}>
            Delete
          </Button>
          <Button variant="contained" sx={{ width: "45%" }}>
            Edit
          </Button>
        </div>
      </div>
    </>
  )
}
