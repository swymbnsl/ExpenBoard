import { Skeleton } from "@mui/material"
import { blue } from "@mui/material/colors"
import React from "react"

export default function Avatar({ name, pfp }) {
  return (
    <div className="p-3 w-full">
      {name ? (
        <Avatar sx={{ bgcolor: blue[500], width: 60, height: 60 }} src={pfp}>
          {!pfp && name[0]}
        </Avatar>
      ) : (
        <Skeleton variant="circular" width={60} height={60} />
      )}
    </div>
  )
}
