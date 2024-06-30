import React from "react"
import { Menu } from "lucide-react"
export const HamburgerIcon = () => {
  return (
    <div className="z-1 top-0 fixed my-4 mx-3 bg-white/10 hover:bg-white/20 rounded-md p-2 bg-blue-500 ">
      <Menu
        strokeWidth={2.5}
        style={{ width: "30px", height: "30px", color: "white" }}
      />
    </div>
  )
}
