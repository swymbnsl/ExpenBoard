"use client"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { HamburgerIcon } from "./Nav-Icon"
import { SheetNavLinks } from "./SheetNavLinks"

export function NavMenuSheet() {
  return (
    <Sheet>
      <SheetTrigger>
        <HamburgerIcon />
      </SheetTrigger>
      <SheetContent side="left">
        <div className="flex flex-col gap-4">
          <SheetNavLinks />
        </div>
      </SheetContent>
    </Sheet>
  )
}
