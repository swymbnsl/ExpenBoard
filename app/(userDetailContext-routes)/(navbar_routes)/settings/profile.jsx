import { Avatar, Skeleton } from "@mui/material"
import React from "react"

export default function Profile({ name, pfp, email }) {
  return (
    <div className="p-3 w-[100%] h-full flex items-center">
      <div className="flex justify-center items-center gap-5">
        {name ? (
          <Avatar
            sx={{
              backgroundColor: pfp ? null : "#2196f3",
              width: 60,
              height: 60,
            }}
            src={pfp}
          >
            {!pfp && name[0]}
          </Avatar>
        ) : (
          <Skeleton variant="circular" width={60} height={60} />
        )}

        {name && email ? (
          <div className="flex flex-col">
            <span className="text-themeonsurface text-xl font-semibold">
              {name.length <= 10 ? name : name.slice(0, 10) + "..."}
            </span>
            <span className="text-sm font-semibold text-themeonsurfacevar break-words">
              {email.length <= 24 ? email : email.slice(0, 21) + "..."}
            </span>
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            <Skeleton
              animation="wave"
              variant="rounded"
              width={140}
              height={20}
            />
            <Skeleton
              animation="wave"
              variant="rounded"
              width={180}
              height={14}
            />
          </div>
        )}
      </div>
    </div>
  )
}
