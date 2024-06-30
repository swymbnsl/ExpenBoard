import React from "react"
import Image from "next/image"
import logo from "../../../../public/logoipsum-296.svg"

export default function Logo() {
  return (
    <div className="h-20 text-3xl w-full fixed font-extrabold bg-themesurface text-white flex items-center justify-center gap-3 py-6">
      <Image src={logo} width={30} height={30} />
      ExpenBoard
    </div>
  )
}
