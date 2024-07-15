"use client"

import { ThemeProvider } from "@emotion/react"
import { createTheme } from "@mui/material"

export const MuiThemeProvider = ({ children }) => {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  })
  return <ThemeProvider theme={darkTheme}>{children}</ThemeProvider>
}
