import React from "react"
import { Avatar, Skeleton } from "@mui/material"
import { Share2 } from "lucide-react"
import { useRouter } from "next/navigation"

export default function Header({ name, pfp }) {
  const router = useRouter()
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
          {name ? (
            <span className="text-themeonsurface font-bold text-2xl">
              {name.length <= 15 ? name : name.slice(0, 10) + "..."}
            </span>
          ) : (
            <Skeleton
              animation="wave"
              variant="rounded"
              width={140}
              height={32}
            />
          )}
        </div>
        <div className="flex items-center gap-4 text-themeonsurface">
          <Share2
            onClick={() => router.push("/share")}
            className="hover:cursor-pointer"
          />

          {name ? (
            <Avatar
              onClick={() => {
                router.push("/profile")
              }}
              className="hover:cursor-pointer"
              sx={{ backgroundColor: pfp ? undefined : "#2196f3" }}
              src={pfp}
            >
              {!pfp && name[0]}
            </Avatar>
          ) : (
            <Skeleton variant="circular" width={40} height={40} />
          )}
        </div>
      </div>
    </>
  )
}
