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
import * as VisuallyHidden from "@radix-ui/react-visually-hidden"

export default function EditCreateCategorySheet({
  type,
  handleCategoryCreate,
  handleCategoryEdit,
  buttonDisabled,
  setButtonDisabled,
  isEditingCategory,
  setIsEditingCategory,
  isSheetOpen,
  setIsSheetOpen,
  setCategoryInputName,
  categoryInputName,
  errorStateHelperText,
}) {
  const handleChange = (evt) => {
    setCategoryInputName(evt.target.value)
  }

  useEffect(() => {
    categoryInputName.length > 0
      ? setButtonDisabled(false)
      : setButtonDisabled(true)
  }, [categoryInputName, setButtonDisabled])

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
          <VisuallyHidden.Root>
            <SheetDescription></SheetDescription>
          </VisuallyHidden.Root>
          <div className="flex justify-between w-full">
            <SheetTitle>
              {type == "edit" ? "Edit Category" : "Create Category"}
            </SheetTitle>
            <span
              onClick={() => {
                setCategoryInputName("")
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
            value={categoryInputName}
            onChange={handleChange}
            id="outlined-name"
            label="Name"
            error={errorStateHelperText ? true : false}
            helperText={errorStateHelperText}
          />
          <PrimaryButton
            clickFunction={async () => {
              setIsEditingCategory(true)
              type == "edit"
                ? await handleCategoryEdit()
                : await handleCategoryCreate()
              setIsEditingCategory(false)
            }}
            disabled={isEditingCategory || buttonDisabled ? true : false}
            width="100%"
            height="40px"
            buttonText={isEditingCategory ? "Saving..." : "Save"}
          />
        </div>
      </SheetContent>
    </Sheet>
  )
}
