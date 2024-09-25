"use client"
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { showErrorToast, showSuccessToast } from "@/utils/hot-toast"

import axios from "axios"
import PrimaryButton from "@/components/buttons/primary_button"

export default function Login() {
  const router = useRouter()

  const initialErrorState = {
    name: false,
    email: false,
    password: false,
  }

  const initialErrorStateHelperText = {
    name: "",
    email: "",
    password: "",
  }

  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  })
  const [buttonDisabled, setButtonDisabled] = useState(true)
  const [registered, setRegistered] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [samePassword, setSamePassword] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState("")
  const [errorState, setErrorState] = useState(initialErrorState)
  const [errorStateHelperText, setErrorStateHelperText] = useState(
    initialErrorStateHelperText
  )

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show)
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword((show) => !show)
  }

  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault()
  }

  const handleChange = (evt) => {
    setErrorState(initialErrorState)
    setErrorStateHelperText(initialErrorStateHelperText)
    if (evt.target.name == "password") {
      if (evt.target.value == confirmPassword) {
        setSamePassword(true)
      } else {
        setSamePassword(false)
      }
    }
    setInput((prevInput) => {
      return {
        ...prevInput,
        [evt.target.name]: evt.target.value,
      }
    })
  }

  const handleConfirmPasswordChange = (evt) => {
    setConfirmPassword(evt.target.value)
    if (input.password && input.password == evt.target.value) {
      setSamePassword(true)
    } else {
      setSamePassword(false)
    }
  }

  const handleSubmit = async () => {
    try {
      setLoading(true)
      const res = await axios.post("/api/user/signup", input)
      showSuccessToast(res.data.message)
      setRegistered(true)
      router.push(`/signup/verify`)
    } catch (error) {
      if (error.response.data.joiError) {
        setErrorState((prevErrorStates) => {
          return {
            ...prevErrorStates,
            [error.response.data.joiRes.error.details[0].context.key]: true,
          }
        })
        setErrorStateHelperText((prevText) => {
          return {
            ...prevText,
            [error.response.data.joiRes.error.details[0].context.key]:
              error.response.data.joiRes.error.details[0].message,
          }
        })
        console.log("Validation failed")
        return
      }
      showErrorToast(error.response.data.error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (
      input.email.length > 0 &&
      input.password.length > 0 &&
      input.name.length > 0 &&
      confirmPassword.length > 0 &&
      samePassword
    ) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }, [input, confirmPassword, samePassword])

  let buttonText = ""
  if (loading) {
    buttonText = "Loading..."
  } else if (registered) {
    buttonText = "Signed up"
  } else {
    buttonText = "Sign Up"
  }

  return (
    <>
      <div className="flex h-full w-full top-0 absolute justify-center items-center">
        <div className="w-[300px] flex flex-col gap-6">
          <span className="text-4xl font-bold text-themeonsurface">
            Sign Up
          </span>
          <TextField
            fullWidth="true"
            name="name"
            value={input.name}
            onChange={handleChange}
            id="outlined-controlled"
            label="Name"
            type="text"
            error={errorState.name ? true : false}
            helperText={errorStateHelperText.name}
          />
          <TextField
            fullWidth="true"
            name="email"
            value={input.email}
            onChange={handleChange}
            id="outlined-controlled-2"
            label="Email"
            type="email"
            error={errorState.email ? true : false}
            helperText={errorStateHelperText.email}
          />
          <FormControl sx={{ width: "100%" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-confirm-password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={input.password}
              error={errorState.password ? true : false}
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
            <FormHelperText
              id="standard-weight-helper-text"
              error={errorState.password ? true : false}
            >
              {errorStateHelperText.password}
            </FormHelperText>
          </FormControl>
          <FormControl sx={{ width: "100%" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Confirm Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showConfirmPassword ? "text" : "password"}
              name="confirmpassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowConfirmPassword}
                    onMouseDown={handleMouseDownConfirmPassword}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Confirm password"
            />
          </FormControl>
          <div className="w-full flex justify-between">
            <Link href="/login" className="text-themeonsurface">
              Login
            </Link>
          </div>
          <PrimaryButton
            clickFunction={handleSubmit}
            disabled={buttonDisabled || loading || registered ? true : false}
            width="100%"
            height="40px"
            buttonText={buttonText}
          />
        </div>
      </div>
    </>
  )
}
