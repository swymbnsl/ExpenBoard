"use client"
import DeleteButton from "@/components/buttons/delete_button"
import SecondaryButton from "@/components/buttons/secondary_button"
import * as VisuallyHidden from "@radix-ui/react-visually-hidden"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export default function DeleteConfirmationDialog({
  title,
  description,
  deleteClickFunction,
  isDeleteDisabled,
  setDeleteDialogOpen,
  deleteDialogOpen,
}) {
  return (
    <AlertDialog open={deleteDialogOpen}>
      <AlertDialogContent className=" bg-themesurface w-[90%]">
        <div className="w-full h-full flex gap-3 text-center flex-col items-center justify-between">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl">{title}</AlertDialogTitle>
            <VisuallyHidden.Root>
              <AlertDialogDescription>
                Dialog for delete confirmation
              </AlertDialogDescription>
            </VisuallyHidden.Root>
          </AlertDialogHeader>
          <span id="delete-confirmation-dialog">{description}</span>

          <div className="flex justify-evenly w-full">
            <SecondaryButton
              clickFunction={() => {
                setDeleteDialogOpen(false)
              }}
              width="45%"
              height="40px"
              buttonText={"Cancel"}
            />

            <DeleteButton
              clickFunction={deleteClickFunction}
              disabled={isDeleteDisabled}
              width="45%"
              height="40px"
              buttonText={"Delete"}
            />
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}
