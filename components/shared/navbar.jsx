import { Bolt, Home, LayoutGrid, Plus, Wallet } from "lucide-react"
import React from "react"

export default function Navbar() {
  return (
    <>
      {/* <div className="flex justify-center w-full"> */}
      <div className="bg-themesurfacedim fixed bottom-0 w-full text-themeonsurface h-[65px] flex justify-center items-center z-10">
        <span className="w-1/5 flex justify-center items-center">
          <Home />
        </span>
        <span className="w-1/5 flex justify-center items-center">
          <Wallet />
        </span>
        {/* <span className="w-1/5 flex justify-center items-center"></span> */}
        <span className="bg-themeonsurface rounded-3xl size-16 -translate-y-5 flex justify-center items-center">
          <Plus color="black" size={30} strokeWidth={3} />
        </span>

        <span className="w-1/5 flex justify-center items-center">
          <LayoutGrid />
        </span>
        <span className="w-1/5 flex justify-center items-center">
          <Bolt />
        </span>
      </div>
      {/* </div> */}
    </>
  )
}
