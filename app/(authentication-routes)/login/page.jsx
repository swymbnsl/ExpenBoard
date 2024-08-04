"use client"
import React, { useEffect, useState } from "react"
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material"

import axios from "axios"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { showSuccessToast, showErrorToast } from "@/utils/hot-toast"

export default function Login() {
  const router = useRouter()

  const [buttonDisabled, setButtonDisabled] = useState(true)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = React.useState(false)
  const [input, setInput] = useState({
    email: "",
    password: "",
  })

  useEffect(() => {
    if (input.email.length > 0 && input.password.length > 0) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }, [input])

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show)
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const handleChange = (evt) => {
    setInput((prevInput) => {
      return {
        ...prevInput,
        [evt.target.name]: evt.target.value,
      }
    })
  }

  const handleSubmit = async () => {
    try {
      setLoading(true)
      const res = await axios.post("/api/user/login", input)
      showSuccessToast(res.data.message)
      console.log("Login Success")
      router.push("/dashboard")
    } catch (error) {
      console.log(error)
      showErrorToast(error.response.data.error)
      if (error.response.data.clear) {
        setInput({
          email: "",
          password: "",
        })
      }
      setLoading(false)
    }
  }

  return (
    <>
      <div className="flex h-full w-full top-0 absolute justify-center items-center">
        <div className="w-[300px] flex flex-col gap-6">
          <span className="text-4xl font-bold text-themeonsurface">Login</span>
          <TextField
            fullWidth="true"
            name="email"
            value={input.email}
            onChange={handleChange}
            id="outlined-controlled"
            label="Email"
            type="email"
          />
          <FormControl sx={{ width: "100%" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={input.password}
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <div className="w-full flex justify-between">
            <Link href="/signup" className="text-themeprimary">
              Sign up
            </Link>
            <Link href="/resetpassword" className="text-themeprimary">
              Forgot password?
            </Link>
          </div>
          <Button
            disabled={buttonDisabled || loading ? true : false}
            variant="contained"
            color="primary"
            fullWidth="true"
            onClick={handleSubmit}
          >
            {loading ? "Loading..." : "Login"}
          </Button>
        </div>
      </div>
    </>
  )
}