"use client"
import { Button, CssBaseline, ThemeProvider, createTheme } from "@mui/material"
import Link from "next/link"
import React from "react"

export default function Verify() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  })

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <div className="text-center w-full h-full flex justify-center items-center">
          <div className=" flex gap-6 flex-col w-[500px] ">
            <span className="text-3xl font-bold text-themeonsurface">
              Verify your email
            </span>
            <span className="text-themeonsurfacevar font-medium">
              We have sent an email to your registered email address to activate
              your account. The link in the email will expire in 24 hours
            </span>
            <div>
              <Link href="/login">
                <Button variant="contained">Login</Button>
              </Link>
            </div>
          </div>
        </div>
      </ThemeProvider>
    </>
  )
}
