"use client"
import PrimaryButton from "@/components/buttons/primary_button"
import SecondaryButton from "@/components/buttons/secondary_button"
import * as VisuallyHidden from "@radix-ui/react-visually-hidden"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { DatePicker } from "./DatePicker"

export default function GenerateShareToken({
  shareOptions,
  setShareOptions,
  open,
  handleTokenCreation,
  setIsGenrateTokenDialogOpen,
  buttonDisabled,
}) {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent className=" bg-themesurface w-[90%]">
        <div className="w-full h-full flex gap-3 text-center flex-col items-center justify-between">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl">
              Generate Link
            </AlertDialogTitle>
            <VisuallyHidden.Root>
              <AlertDialogDescription>
                Dialog for share link generation
              </AlertDialogDescription>
            </VisuallyHidden.Root>
          </AlertDialogHeader>

          <RadioGroup
            defaultValue="all"
            onValueChange={(value) => {
              setShareOptions((prev) => {
                return {
                  ...prev,
                  ["allTransactions"]: value == "all" ? true : false,
                }
              })
            }}
            className="flex flex-col gap-3 w-full"
            value={shareOptions.allTransactions ? "all" : "custom"}
          >
            <div className="flex items-center gap-3">
              <RadioGroupItem value="all" id="all" />
              <Label htmlFor="all">Share all transactions</Label>
            </div>
            {shareOptions.allTransactions && (
              <div className="p-4 rounded-xl w-full bg-themesurfacedim/50 flex gap-2 justify-center items-center">
                <Label htmlFor="use-future-transaction">
                  Include future transactions?
                </Label>
                <Switch
                  className="data-[state=unchecked]:bg-themeonsurface/50"
                  id="use-future-transaction"
                  checked={shareOptions.includeFuture}
                  onCheckedChange={() =>
                    setShareOptions((prev) => {
                      return {
                        ...prev,
                        ["includeFuture"]: !shareOptions.includeFuture,
                      }
                    })
                  }
                />
              </div>
            )}
            <div className="flex items-center gap-3">
              <RadioGroupItem value="custom" id="custom" />
              <Label htmlFor="custom">Custom date range</Label>
            </div>
            {!shareOptions.allTransactions && (
              <div className="p-4 rounded-xl w-full bg-themesurfacedim/50 flex flex-col gap-3 justify-center">
                <span className="font-semibold text-left">Start Date</span>
                <div className="flex gap-3 items-center w-full justify-center">
                  <Label htmlFor="use-first-transaction">
                    From first transaction
                  </Label>
                  <Switch
                    className="data-[state=unchecked]:bg-themeonsurface/50"
                    id="use-first-transaction"
                    checked={shareOptions.first}
                    onCheckedChange={() =>
                      setShareOptions((prev) => {
                        return {
                          ...prev,
                          ["first"]: !shareOptions.first,
                        }
                      })
                    }
                  />
                </div>
                {!shareOptions.first && (
                  <DatePicker
                    setDate={(value) =>
                      setShareOptions((prev) => {
                        return {
                          ...prev,
                          ["from"]: value,
                        }
                      })
                    }
                    date={shareOptions.from}
                    width="100%"
                  />
                )}
                <span className="font-semibold text-left">End Date</span>
                <div className="flex gap-3 items-center w-full justify-center">
                  <Label htmlFor="present">Till Present</Label>
                  <Switch
                    className="data-[state=unchecked]:bg-themeonsurface/50"
                    id="present"
                    checked={shareOptions.present}
                    onCheckedChange={() =>
                      setShareOptions((prev) => {
                        return {
                          ...prev,
                          ["present"]: !shareOptions.present,
                        }
                      })
                    }
                  />
                </div>
                <span className="text-xs">
                  &#40;includes future transactions as well &#41;
                </span>
                {!shareOptions.present && (
                  <DatePicker
                    setDate={(value) =>
                      setShareOptions((prev) => {
                        return {
                          ...prev,
                          ["to"]: value,
                        }
                      })
                    }
                    date={shareOptions.to}
                    width="100%"
                  />
                )}
              </div>
            )}
          </RadioGroup>

          <div className="flex justify-evenly w-full">
            <SecondaryButton
              clickFunction={() => {
                setIsGenrateTokenDialogOpen(false)
              }}
              width="45%"
              height="40px"
              buttonText={"Cancel"}
            />

            <PrimaryButton
              clickFunction={handleTokenCreation}
              disabled={buttonDisabled}
              width="45%"
              height="40px"
              buttonText={"Generate"}
            />
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}
