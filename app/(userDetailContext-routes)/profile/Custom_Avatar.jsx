import { Avatar, Badge, Skeleton } from "@mui/material"
import { blue } from "@mui/material/colors"
import { Pencil } from "lucide-react"
import React from "react"

export default function CustomAvatar({ name, pfp }) {
  console.log(name)
  return (
    <div>
      {name ? (
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          badgeContent={
            <div className="w-[40px] h-[40px] bg-themeonsurface border-black shadow-black shadow-sm border-2 text-themesurface flex justify-center items-center rounded-full hover:cursor-pointer hover:bg-themeonsurfacevar">
              <Pencil size={18} />
            </div>
          }
        >
          <Avatar
            sx={{ bgcolor: blue[500], width: 120, height: 120 }}
            src={pfp}
          >
            {!pfp && name[0]}
          </Avatar>
        </Badge>
      ) : (
        <Skeleton variant="circular" width={120} height={120} />
      )}
    </div>
  )
}
