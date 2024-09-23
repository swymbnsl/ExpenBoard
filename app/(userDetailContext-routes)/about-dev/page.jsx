"use client"
import { GitHub, Instagram, LinkedIn, X } from "@mui/icons-material"
import { Avatar } from "@mui/material"
import { ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import React from "react"

export default function AboutDeveloper() {
  const router = useRouter()
  return (
    <>
      <div className="w-full h-full flex flex-col items-center gap-3">
        <div className="p-3 w-full flex gap-3 items-center">
          <span
            onClick={() => {
              router.back()
            }}
            className="w-[35px] h-[35px] border rounded-md flex justify-center items-center border-white/20 hover:border-white/80 hover:cursor-pointer"
          >
            <ChevronLeft size={25} strokeWidth={3} />
          </span>
          <span className="text-themeonsurface font-bold text-2xl">
            About Developer
          </span>{" "}
        </div>
        <div className="w-full flex justify-center">
          <Avatar
            className=" border-b-4 border-t-transparent border-white"
            style={{
              width: 160,
              height: 160,
            }}
            src={"https://avatars.githubusercontent.com/u/167964325?v=4"}
          />
        </div>
        <span className="text-themeonsurface font-bold text-xl">Swayam</span>
        <div className="w-[70%] flex pt-3 justify-evenly">
          {[
            { icon: X, link: "https://x.com/swymbnsl" },
            { icon: GitHub, link: "https://github.com/swymbnsl" },
            { icon: LinkedIn, link: "https://linkedin.com/in/swymbnsl" },
          ].map(({ icon: Icon, link }, index) => (
            <a href={link} target="_blank" key={index}>
              <Icon fontSize="large" />
            </a>
          ))}
        </div>
        <div className="p-3 text-lg text-center font-medium leading-relaxed w-[80%] mx-auto">
          <p>
            Hi, I&apos;m Swayam, a 19 yo full stack dev. I build production
            ready awesome looking apps with MERN and Next.js. I enjoy solving
            complex problems and building efficient solutions. In my spare time,
            I contribute to open-source projects and explore cutting-edge
            technologies to stay ahead of the curve. Let&apos;s connect!
          </p>
        </div>
      </div>
    </>
  )
}
