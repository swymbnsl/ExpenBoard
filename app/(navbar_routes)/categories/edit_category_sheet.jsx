import React, { useEffect, useState } from "react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import PrimaryButton from "@/components/buttons/primary_button"
import { X } from "lucide-react"
import { TextField } from "@mui/material"
import { textFieldSx } from "@/components/styles-sx/textfield_sx"

export default function EditCategorySheet({
  handleCategoryEdit,
  buttonDisabled,
  setButtonDisabled,
  isEditingCategory,
  setIsEditingCategory,
  isSheetOpen,
  setIsSheetOpen,
  setEditCategoryName,
  editCategoryName,
  errorStateHelperText,
}) {
  const handleChange = (evt) => {
    setEditCategoryName(evt.target.value)
  }

  useEffect(() => {
    editCategoryName.length > 0
      ? setButtonDisabled(false)
      : setButtonDisabled(true)
  }, [editCategoryName])

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
            <SheetTitle>Edit Category</SheetTitle>
            <span
              onClick={() => {
                setEditCategoryName("")
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
            value={editCategoryName}
            onChange={handleChange}
            id="outlined-name"
            label="Name"
            error={errorStateHelperText ? true : false}
            helperText={errorStateHelperText}
          />
          <PrimaryButton
            clickFunction={async () => {
              setIsEditingCategory(true)
              await handleCategoryEdit()
              setIsEditingCategory(false)
            }}
            disabled={isEditingCategory || buttonDisabled ? true : false}
            width="full"
            height="[40px]"
            buttonText={isEditingCategory ? "Saving..." : "Save"}
          />
        </div>
      </SheetContent>
    </Sheet>
  )
}
