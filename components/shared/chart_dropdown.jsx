import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import { useState } from "react"
import { ThemeProvider } from "@emotion/react"
import { CssBaseline, createTheme } from "@mui/material"

export default function ChartSelect() {
  const [type, setType] = useState("Line")

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  })

  const handleChange = (event) => {
    setType(event.target.value)
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <Select
          value={type}
          onChange={handleChange}
          displayEmpty
          renderValue={() => "Line"}
        >
          <MenuItem value={"Line"}>Line</MenuItem>
          <MenuItem value={"Bar"}>Bar</MenuItem>
        </Select>
      </FormControl>
    </ThemeProvider>
  )
}
