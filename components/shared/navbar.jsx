import { Bolt, Home, LayoutGrid, Plus, Wallet } from "lucide-react"
import React from "react"

export default function Navbar() {
  return (
    <>
      <div className="bg-themesurfacedim fixed bottom-0 w-full shadow-lg shadow-black text-themeonsurface h-[55px] flex justify-center items-center z-10">
        <span className="w-1/5 flex justify-center items-center">
          <Home size={25} />
        </span>
        <span className="w-1/5 flex justify-center items-center">
          <Wallet size={25} />
        </span>
        <span className="bg-themeonsurface rounded-3xl size-[60px] border-black border-2 shadow-sm shadow-black  -translate-y-[30px] flex justify-center items-center ">
          <Plus color="black" size={30} strokeWidth={3} />
        </span>

        <span className="w-1/5 flex justify-center items-center">
          <LayoutGrid size={25} />
        </span>
        <span className="w-1/5 flex justify-center items-center">
          <Bolt size={25} />
        </span>
      </div>
    </>
  )
}
