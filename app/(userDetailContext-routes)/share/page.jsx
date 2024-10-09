"use client"
import { ChevronLeft, Copy, FileText, Link, Sheet, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import GenerateShareToken from "./components/GenerateShareToken"
import { showErrorToast, showSuccessToast } from "@/utils/hot-toast"
import axios from "axios"
import { format } from "date-fns"
import { CircularProgress } from "@mui/material"

export default function Share() {
  const [isGenrateTokenDialogOpen, setIsGenrateTokenDialogOpen] =
    useState(false)
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [tokens, setTokens] = useState([])

  const [shareOptions, setShareOptions] = useState({
    allTransactions: true,
    includeFuture: false,
    first: false,
    present: false,
    from: new Date(new Date().setDate(new Date().getDate() - 6)),
    to: new Date(),
  })

  const [reqBody, setReqBody] = useState({})

  const getTokens = async () => {
    try {
      setIsLoading(true)
      const res = await axios.get("/api/user/share-token")
      setTokens(res.data.tokens)
    } catch (error) {
      console.log(error)
      showErrorToast("Error fetching old links")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (shareOptions.allTransactions) {
      setReqBody({
        from: null,
        to: shareOptions.includeFuture ? null : new Date(),
      })
    } else {
      setReqBody({
        from: shareOptions.first ? null : shareOptions.from,
        to: shareOptions.present ? null : shareOptions.to,
      })
    }
  }, [shareOptions])

  useEffect(() => {
    getTokens()
  }, [buttonDisabled])

  const handleTokenCreation = async () => {
    try {
      setButtonDisabled(true)
      const res = await axios.post("/api/user/share-token", reqBody)
      showSuccessToast(res.data.message)
    } catch (error) {
      showErrorToast(error.response.data.error)
    } finally {
      setIsGenrateTokenDialogOpen(false)
      setButtonDisabled(false)
    }
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
            className={
              "bg-themesurfacedim/50 p-3 w-[48%] blue h-[100px] rounded-xl "
            }
          >
            <div className="flex flex-col items-center h-full">
              <div className="flex h-full justify-center items-center gap-3">
                <Icon size={35} color={color} />
                <span className="text-2xl font-semibold text-themeonsurfacevar">
                  {name}
                </span>
              </div>
              <i className="text-muted-foreground text-xs">Coming Soon</i>
            </div>
          </div>
        ))}
      </div>
      <span className="text-lg">OR</span>
      <div
        onClick={() => setIsGenrateTokenDialogOpen(true)}
        className="bg-themesurfacedim hover:cursor-pointer hover:bg-themenavbarinactive p-3 font-medium w-full flex justify-center gap-3 items-center text-xl h-[100px] rounded-2xl "
      >
        <Link />
        Generate a new link
      </div>
      <GenerateShareToken
        shareOptions={shareOptions}
        setShareOptions={setShareOptions}
        buttonDisabled={buttonDisabled}
        handleTokenCreation={handleTokenCreation}
        open={isGenrateTokenDialogOpen}
        setIsGenrateTokenDialogOpen={setIsGenrateTokenDialogOpen}
      />
      <span className="inline-block w-full text-xl font-semibold">
        Active Links
      </span>
      {isLoading ? (
        <CircularProgress />
      ) : (
        tokens.map((i, index) => {
          return (
            <LinkCard
              key={index}
              token={i}
              setTokens={setTokens}
              tokens={tokens}
            />
          )
        })
      )}
    </div>
  )
}

function LinkCard({ token, setTokens, tokens }) {
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`/api/user/share-token?id=${id}`)
      setTokens((prev) => {
        return prev.filter((i) => i._id != id)
      })
      showSuccessToast(res.data.message)
    } catch (error) {
      console.log(error)
      showErrorToast(error.response.data.error)
    } finally {
    }
  }
  let text = ""
  if (token.period.from) {
    text = format(token.period.from, "dd LLL yyyy") + " - "
  } else {
    text = "First" + " - "
  }

  if (token.period.to) {
    text += format(token.period.to, "dd LLL yyyy")
  } else {
    text += "Present"
  }

  return (
    <div className="bg-themesurfacedim p-3 font-medium w-full flex gap-5 items-center justify-between rounded-2xl">
      <div className="flex gap-4">
        <Link size={20} />
        <span className="text-sm">{text}</span>
      </div>
      <div className="flex gap-2">
        <div className="w-[30px] h-[30px] rounded-lg bg-white/20 flex justify-center items-center">
          <Copy
            className="hover:cursor-pointer"
            size={18}
            onClick={() => {
              let copyUrl =
                process.env.NEXT_PUBLIC_DOMAIN + "/shared?t=" + token.shareToken
              navigator.clipboard
                .writeText(copyUrl)
                .then(() => {
                  showSuccessToast("Url copied")
                })
                .catch((err) => {
                  console.error("Failed to copy: ", err)
                })
            }}
          />
        </div>
        <div className="w-[30px] h-[30px] rounded-lg bg-red-400 flex justify-center items-center">
          <Trash2
            className="hover:cursor-pointer"
            size={18}
            onClick={() => handleDelete(token._id)}
          />
        </div>
      </div>
    </div>
  )
}
