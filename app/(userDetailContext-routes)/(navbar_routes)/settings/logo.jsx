import React from "react"
import Image from "next/image"
import logo from "../../../../public/logoipsum-296.svg"

export default function Logo() {
  return (
    <div className="h-20 text-3xl font-extrabold text-themeonsurface flex items-center gap-3 p-3">
      <Image src={logo} width={35} height={35} alt="profile-pic" />
      ExpenBoard
    </div>
  )
}
