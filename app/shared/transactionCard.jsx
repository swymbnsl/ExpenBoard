import { TrendingDown, TrendingUp } from "lucide-react"

export default function TransactionCard({
  type,
  name,
  amount,
  category,
  date,
  time,
}) {
  return (
    <div className="bg-themesurfacedim h-[100px] w-full rounded-2xl flex items-center justify-between py-6 px-3 hover:bg-themenavbar hover:cursor-pointer">
      <div className="flex items-center gap-3 ">
        <div
          className={
            (type == "income"
              ? "text-green-700 bg-green-100"
              : "text-red-700 bg-red-100") +
            " w-[50px] h-[50px] rounded-xl flex justify-center items-center"
          }
        >
          {type == "income" ? (
            <TrendingUp size={30} strokeWidth={2.5} />
          ) : (
            <TrendingDown size={30} strokeWidth={2.5} />
          )}
        </div>
        <div className="flex flex-col">
          <span className="text-themeonsurface font-bold text-lg">
            {name.length <= 8 ? name : name.slice(0, 5) + "..."}
          </span>
          <span className=" text-muted-foreground font-semibold text-sm">
            {category.length <= 8 ? category : category.slice(0, 5) + "..."}
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
        <div className="flex gap-2">
          <span className=" text-muted-foreground font-semibold text-sm">
            {date}
          </span>
          <span className=" text-muted-foreground font-semibold text-sm">
            {time}
          </span>
        </div>
      </div>
    </div>
  )
}
