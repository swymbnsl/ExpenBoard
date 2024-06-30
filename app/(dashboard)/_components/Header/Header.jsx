import Image from "next/image"
import logo from "../../../../public/logoipsum-296.svg"
import { NavMenuSheet } from "./Navbar/NavMenu-sheet"

export const Navbar = () => {
  return (
    <>
      <div className="h-20 text-3xl w-full fixed font-extrabold text-white flex items-center justify-center gap-3 py-6">
        <Image src={logo} width={30} height={30} />
        ExpenBoard
      </div>
      <NavMenuSheet />
    </>
  )
}
