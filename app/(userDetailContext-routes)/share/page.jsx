"use client"
import { ChevronLeft, Copy, FileText, Link, Sheet, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import React, { useState } from "react"

export default function Share() {
  const [activeLinks, setActiveLinks] = useState({
    id: "",
    url: "",
    token: "",
    period: {
      from: undefined,
      to: undefined,
    },
  })

  const handleTokenCreation = async () => {
    const res = await axios.post("/api/user/share-token", {
      from: new Date(),
      to: new Date(),
    })
  }

  const router = useRouter()
  return (
    <div className="w-full h-full flex flex-col p-3 gap-3 items-center">
      <div className="w-full flex gap-3 items-center">
        <span
          onClick={() => {
            router.back()
          }}
          className="w-[35px] h-[35px] border rounded-md flex justify-center items-center border-white/20 hover:border-white/80 hover:cursor-pointer"
        >
          <ChevronLeft size={25} strokeWidth={3} />
        </span>
        <span className="text-themeonsurface font-bold text-2xl">Share</span>{" "}
      </div>
      <div className="flex w-full justify-between ">
        {[
          { icon: FileText, name: "PDF", color: "#93C5fd" },
          { icon: Sheet, name: "Excel", color: "#86efac" },
        ].map(({ icon: Icon, name, color }, index) => (
          <div
            key={index}
            className={"bg-themesurfacedim p-3 w-[48%] h-[100px] rounded-xl "}
          >
            <div className="flex h-full justify-center items-center gap-3">
              <Icon size={35} color={color} />
              <span className="text-2xl font-semibold">{name}</span>
            </div>
          </div>
        ))}
      </div>

      <span className="text-lg">OR</span>
      <div
        onClick={handleTokenCreation}
        className="bg-themesurfacedim hover:cursor-pointer p-3 font-medium w-full flex justify-center gap-3 items-center text-xl h-[100px] rounded-2xl "
      >
        <Link />
        Generate a new link
      </div>
      <span className="inline-block w-full text-xl font-semibold">
        Active Links
      </span>
      <div className="bg-themesurfacedim p-3 font-medium w-full flex gap-5 items-center justify-between rounded-2xl">
        <div className="flex gap-4">
          <Link size={20} />
          <span>May 23, 2024 - Present</span>
        </div>
        <div className="flex gap-2">
          <div className="w-[30px] h-[30px] rounded-lg bg-white/20 flex justify-center items-center">
            <Copy size={18} />
          </div>
          <div className="w-[30px] h-[30px] rounded-lg bg-red-400 flex justify-center items-center">
            <Trash2 size={18} />
          </div>
        </div>
      </div>
    </div>
  )
}
