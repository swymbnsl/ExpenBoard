import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { X } from "lucide-react"
import React from "react"
import ImageCropper from "./croppie_Image_Cropper"

export default function CropImageSheet({
  handlePfpChange,
  isSheetOpen,
  setIsSheetOpen,
  selectedImageBase64String,
}) {
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
            <SheetTitle className="text-xl">Crop image</SheetTitle>
            <span
              onClick={() => {
                setIsSheetOpen(false)
              }}
              className="border border-white/20 p-1 rounded-md hover:cursor-pointer hover:border-white/80"
            >
              <X size={18} />
            </span>
          </div>
        </SheetHeader>
        <ImageCropper
          handlePfpChange={handlePfpChange}
          selectedImageBase64String={selectedImageBase64String}
        />
      </SheetContent>
    </Sheet>
  )
}
