import { Roboto } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme_providers/shadcn-theme-provider"
import { CssBaseline } from "@mui/material"
import { MuiThemeProvider } from "@/components/theme_providers/material-ui-theme-provider"
import { Toaster } from "react-hot-toast"
import MobileOnlyWrapper from "@/components/MobileOnlyWrapper" // Add this import

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
})

export const metadata = {
  title: "Expenboard",
  description: "A Next.js expense tracking app",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={roboto.className} suppressHydrationWarning={true}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <MuiThemeProvider>
            <CssBaseline />
            <Toaster />
            <MobileOnlyWrapper>{children}</MobileOnlyWrapper>
            <Toaster richColors />
          </MuiThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
