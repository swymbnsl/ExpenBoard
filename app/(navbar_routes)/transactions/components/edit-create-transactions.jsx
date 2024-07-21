import React, { useContext, useState } from "react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material"
import CategorySelect from "./creatable-category-select"
import { DatePicker } from "./date-picker"

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3"
import { TimeClock } from "@mui/x-date-pickers/TimeClock"
import { Clock } from "lucide-react"
import { format } from "date-fns"
format

export default function EditCreateTransactionsSheet({ type, symbol }) {
  const [transactionType, setTransactionType] = useState(null)
  return (
    <Sheet>
      <SheetTrigger>Open</SheetTrigger>
      <SheetContent
        className="bg-themesurface text-themeonsurface w-full h-[80%]"
        side="bottom"
      >
        <SheetHeader>
          <SheetTitle>
            {type == "edit" ? "Edit Transaction" : "Create Transaction"}
          </SheetTitle>
        </SheetHeader>
        <div className="w-full h-[500px] flex flex-col gap-2 justify-center items-center">
          <TextField
            fullWidth
            sx={{
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
            name="name"
            //   value={searchTerm}
            //   onChange={handleSearchChange}
            id="outlined-name"
            label="Name"
          />
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              startAdornment={
                <InputAdornment position="start">{symbol}</InputAdornment>
              }
              label="Amount"
              type="number"
            />
          </FormControl>
          <div className="w-full flex justify-between">
            <div
              onClick={() => setTransactionType("income")}
              className={
                (transactionType == "income"
                  ? "bg-green-400"
                  : "bg-green-100 hover:bg-green-300") +
                " w-[40%] hover:cursor-pointer  h-[50px] rounded-md flex justify-center items-center text-themesurface font-bold"
              }
            >
              Income
            </div>
            <div
              onClick={() => setTransactionType("expense")}
              className={
                (transactionType == "expense"
                  ? "bg-red-400"
                  : "bg-red-100 hover:bg-red-300") +
                " w-[40%] hover:cursor-pointer transition-all duration-100 h-[50px] rounded-md flex justify-center items-center text-themesurface font-bold"
              }
            >
              Expense
            </div>
          </div>
          <CategorySelect disabled={!transactionType ? true : false} />
          <div className="w-full flex justify-between">
            <DatePicker />
            <div className="w-[45%] flex gap-2 justify-start px-3 hover:cursor-pointer items-center border border-white/5 rounded-md hover:bg-themenavbar transition-all duration-100 bg-themesurfacedim h-full">
              <Clock size={18} />
              {format(Date.now(), "hh:mm aaa")}
            </div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              {/* <TimeClock /> */}
            </LocalizationProvider>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
