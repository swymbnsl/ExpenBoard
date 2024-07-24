"use client"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export default function DeleteConfirmationDialog({
  setDeleteDialogOpen,
  deleteDialogOpen,
  handleDelete,
  deleteID,
}) {
  return (
    <AlertDialog open={deleteDialogOpen}>
      <AlertDialogContent
        aria-describedby="dialog-content"
        className=" bg-themesurface w-[90%]"
      >
        <div className="w-full h-full flex gap-3 text-center flex-col items-center justify-between">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl">
              Delete this transaction?
            </AlertDialogTitle>
          </AlertDialogHeader>
          Once deleted, you won't be able to recover it..!
          <div className="flex justify-evenly w-full">
            <div
              onClick={() => {
                setDeleteDialogOpen(false)
              }}
              className="hover:cursor-pointer hover:bg-themesurfacedim transition-all duration-100 w-[45%] h-[40px] rounded-md flex justify-center items-center  bg-transparent border border-white/20"
            >
              Cancel
            </div>
            <div
              onClick={() => {
                handleDelete(deleteID)
              }}
              className="hover:cursor-pointer hover:bg-red-400 transition-all duration-100 w-[45%] h-[40px] rounded-md flex justify-center text-themesurface items-center  bg-red-300"
            >
              Delete
            </div>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}
