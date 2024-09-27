import React, { useEffect, useMemo, useState } from "react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import {
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material"
import CategorySelect from "./creatable_category_select"
import { DatePicker } from "./date_picker"

import { CircleMinus, CirclePlus, Clock, X } from "lucide-react"
import { format } from "date-fns"

import SetTimeDialog from "../Dialogs/time-select-dialog/time_select_dialog"
import axios from "axios"
import { showErrorToast, showSuccessToast } from "@/utils/hot-toast"
import PrimaryButton from "@/components/buttons/primary_button"
import { textFieldSx } from "@/components/styles-sx/textfield_sx"

export default function EditCreateTransactionsSheet({
  type,
  symbol,
  isSheetOpen,
  setIsSheetOpen,
  editTransactionFields,
}) {
  const initialErrorState = {
    name: false,
    amount: false,
    category: false,
  }

  const initialErrorStateHelperText = {
    name: "",
    amount: "",
    category: "",
  }

  const initialEditInputsState = useMemo(() => {
    return {
      name: editTransactionFields.name,
      amount: editTransactionFields.amount,
      type: editTransactionFields.type,
      category: editTransactionFields.category,
      dateAndTime: editTransactionFields.dateAndTime,
    }
  }, [
    editTransactionFields.name,
    editTransactionFields.amount,
    editTransactionFields.type,
    editTransactionFields.category,
    editTransactionFields.dateAndTime,
  ])

  const initialCreateInputsState = {
    name: "",
    amount: "",
    type: "income",
    category: "",
    dateAndTime: new Date(),
  }

  const [isExpense, setIsExpense] = useState(false)
  const [timeDialogOpen, setTimeDialogOpen] = useState(false)
  const [buttonDisabled, setButtonDisabled] = useState(true)

  const [inputs, setInputs] = useState(initialCreateInputsState)
  const [isCreatingTransaction, setIsCreatingTransaction] = useState(false)
  const [errorState, setErrorState] = useState(initialErrorState)
  const [errorStateHelperText, setErrorStateHelperText] = useState(
    initialErrorStateHelperText
  )

  const [editingTransactionId, setEditingTransactionId] = useState("")

  const handleChange = (evt) => {
    setErrorState(initialErrorState)
    setErrorStateHelperText(initialErrorStateHelperText)
    setInputs((prevValues) => {
      return {
        ...prevValues,
        [evt.target.name]: evt.target.value,
      }
    })
  }

  const handelCreateNewTransaction = async () => {
    try {
      setIsCreatingTransaction(true)
      const res = await axios.post("/api/user/transactions", inputs)
      showSuccessToast(res.data.message)
      setIsSheetOpen(false)
      setInputs(initialCreateInputsState)
    } catch (error) {
      console.log(error)
      if (error.response.data.joiError) {
        setErrorState((prevErrorStates) => {
          return {
            ...prevErrorStates,
            [error.response.data.joiRes.error.details[0].context.key]: true,
          }
        })
        setErrorStateHelperText((prevText) => {
          return {
            ...prevText,
            [error.response.data.joiRes.error.details[0].context.key]:
              error.response.data.joiRes.error.details[0].message,
          }
        })
        return
      }
      showErrorToast(error.response.data.error)
    } finally {
      setIsCreatingTransaction(false)
    }
  }

  const handelEditTransaction = async (id) => {
    try {
      setIsCreatingTransaction(true)
      const res = await axios.patch("/api/user/transactions", {
        id,
        ...inputs,
      })
      showSuccessToast(res.data.message)
      setIsSheetOpen(false)
      setInputs(initialCreateInputsState)
    } catch (error) {
      console.log(error)
      if (error.response.data.joiError) {
        setErrorState((prevErrorStates) => {
          return {
            ...prevErrorStates,
            [error.response.data.joiRes.error.details[0].context.key]: true,
          }
        })
        setErrorStateHelperText((prevText) => {
          return {
            ...prevText,
            [error.response.data.joiRes.error.details[0].context.key]:
              error.response.data.joiRes.error.details[0].message,
          }
        })
        return
      }
      showErrorToast(error.response.data.error)
    } finally {
      setIsCreatingTransaction(false)
    }
  }

  useEffect(() => {
    if (
      inputs.name.length > 0 &&
      inputs.amount.toString().length > 0 &&
      inputs.category.length > 0
    ) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }, [inputs])

  useEffect(() => {
    if (type == "edit") {
      setEditingTransactionId(editTransactionFields.id)
      setInputs(initialEditInputsState)
      setIsExpense(editTransactionFields.type == "expense" ? true : false)
      setButtonDisabled(false)
    }
  }, [editTransactionFields, initialEditInputsState, type])

  let buttonText = ""
  if (isCreatingTransaction) {
    buttonText = "Saving..."
  } else {
    buttonText = "Save"
  }

  return (
    <Sheet open={isSheetOpen}>
      <SheetContent
        onOpenAutoFocus={(e) => {
          e.preventDefault()
        }}
        className="bg-themesurface text-themeonsurface w-full flex flex-col items-center justify-center"
        side="bottom"
      >
        <SheetHeader className="w-[300px]">
          <SheetDescription></SheetDescription>
          <div className="flex justify-between w-full">
            <SheetTitle>
              {type == "edit" ? "Edit Transaction" : "Create Transaction"}
            </SheetTitle>
            <span
              onClick={() => {
                setInputs(initialCreateInputsState)
                setIsExpense(false)
                setIsSheetOpen(false)
              }}
              className="border border-white/20 p-1 rounded-md hover:cursor-pointer hover:border-white/80"
            >
              <X size={18} />
            </span>
          </div>
        </SheetHeader>
        <div className="w-[300px] flex flex-col gap-4 py-5 justify-center items-center">
          <TextField
            autoFocus={false}
            fullWidth
            sx={textFieldSx}
            name="name"
            value={inputs.name}
            onChange={handleChange}
            id="outlined-name"
            label="Name"
            error={errorState.name ? true : false}
            helperText={errorStateHelperText.name}
          />
          <FormControl fullWidth>
            <InputLabel
              error={errorState.amount ? true : false}
              htmlFor="outlined-adornment-amount"
            >
              Amount
            </InputLabel>
            <OutlinedInput
              name="amount"
              value={inputs.amount}
              onChange={handleChange}
              id="outlined-adornment-amount"
              startAdornment={
                <InputAdornment position="start">{symbol}</InputAdornment>
              }
              label="Amount"
              sx={textFieldSx}
              type="number"
              placeholder="00"
              error={errorState.amount ? true : false}
            />
            <FormHelperText error id="outlined-adornment-amount-helper-text">
              {errorStateHelperText.amount}
            </FormHelperText>
          </FormControl>

          <div className="flex w-full justify-between gap-3 items-center">
            {/* category selector starts*/}

            <div
              onClick={() => {
                setIsExpense(!isExpense)
                const type = !isExpense ? "expense" : "income"
                setInputs((prev) => {
                  return {
                    ...prev,
                    type: type,
                  }
                })
              }}
              className={
                (isExpense ? "bg-red-300" : "bg-green-300") +
                " transition-all duration-100 w-[50px] hover:cursor-pointer box-border border border-white/20 h-[50px] rounded-md flex justify-center items-center text-themesurface font-bold"
              }
            >
              {isExpense ? <CircleMinus /> : <CirclePlus />}
            </div>

            {/* category selector ends*/}

            <CategorySelect
              error={errorState.amount}
              helperText={errorStateHelperText.amount}
              inputs={inputs}
              isExpense={isExpense}
              setInputs={setInputs}
            />
          </div>
          <div className="w-full flex justify-between">
            <DatePicker inputs={inputs} width="45%" setInputs={setInputs} />
            <div
              onClick={() => {
                setTimeDialogOpen(true)
              }}
              className="w-[45%] flex gap-2 justify-start px-3 hover:cursor-pointer items-center border border-white/5 rounded-md hover:bg-themenavbar transition-all duration-100 bg-themesurfacedim h-[40px] font-medium"
            >
              <Clock size={18} />
              {format(inputs.dateAndTime, "hh:mm aaa")}
            </div>

            <SetTimeDialog
              inputs={inputs}
              setInputs={setInputs}
              timeDialogOpen={timeDialogOpen}
              setTimeDialogOpen={setTimeDialogOpen}
            />
          </div>

          <PrimaryButton
            clickFunction={() => {
              type == "edit"
                ? handelEditTransaction(editingTransactionId)
                : handelCreateNewTransaction()
              setIsCreatingTransaction(true)
            }}
            disabled={isCreatingTransaction || buttonDisabled ? true : false}
            width="100%"
            height="40px"
            buttonText={buttonText}
          />
        </div>
      </SheetContent>
    </Sheet>
  )
}
