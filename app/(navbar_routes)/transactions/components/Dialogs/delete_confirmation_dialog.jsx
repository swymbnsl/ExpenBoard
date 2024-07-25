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
  isDeleteDisabled,
  setIsDeleteDisabled,
  setDeleteDialogOpen,
  deleteDialogOpen,
  handleDelete,
  deleteID,
}) {
  return (
    <AlertDialog open={deleteDialogOpen}>
      <AlertDialogContent className=" bg-themesurface w-[90%]">
        <div className="w-full h-full flex gap-3 text-center flex-col items-center justify-between">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl">
              Delete this transaction?
            </AlertDialogTitle>
            <VisuallyHidden.Root>
              <AlertDialogDescription>
                Dialog for delete confirmation
              </AlertDialogDescription>
            </VisuallyHidden.Root>
          </AlertDialogHeader>
          <span id="delete-confirmation-dialog">
            Once deleted, you won't be able to recover it..!
          </span>

          <div className="flex justify-evenly w-full">
            <SecondaryButton
              clickFunction={() => {
                setDeleteDialogOpen(false)
              }}
              width={"45%"}
              height={"40px"}
              buttonText={"Cancel"}
            />

            <DeleteButton
              clickFunction={async () => {
                setIsDeleteDisabled(true)
                await handleDelete(deleteID)
                setIsDeleteDisabled(false)
              }}
              disabled={isDeleteDisabled}
              width={"45%"}
              height={"40px"}
              buttonText={"Delete"}
            />
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}
