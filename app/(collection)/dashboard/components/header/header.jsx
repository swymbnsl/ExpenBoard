import React from "react"
import { Avatar } from "@mui/material"
import { blue } from "@mui/material/colors"
import { Share2 } from "lucide-react"

export default function Header({ name, pfp }) {
  const hour = new Date().getHours()
  let greetings = ""

  if (hour < 12) {
    greetings = "Good Morning"
  } else if (hour < 18) {
    greetings = "Good Afternoon"
  } else {
    greetings = "Good Evening"
  }

  return (
    <>
      <div className="w-full flex p-3 justify-between items-center">
        <div className="flex flex-col">
          <span className="text-themeonsurface text-lg">{greetings}</span>
          <span className="text-themeonsurface font-bold text-2xl">{name}</span>
        </div>
        <div className="flex items-center gap-4 text-themeonsurface">
          <Share2 />

          <Avatar sx={{ bgcolor: blue[500] }} src={pfp}>
            {!pfp && name[0]}
          </Avatar>
        </div>
      </div>
    </>
  )
}
