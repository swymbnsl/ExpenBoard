"use client"
import { UserDetailsContext } from "@/context/userDetails"
import React, { useContext, useEffect, useState } from "react"
import CustomAvatar from "./Custom_Avatar"
import { ChevronLeft } from "lucide-react"
import { TextField } from "@mui/material"
import PrimaryButton from "@/components/buttons/primary_button"
import { useRouter } from "next/navigation"
import { textFieldSx } from "@/components/styles-sx/textfield_sx"

export default function Profile() {
  const initialErrorStateHelperText = {
    name: "",
    email: "",
    password: "",
  }
  const { name, pfp, email } = useContext(UserDetailsContext)
  const [buttonDisabled, setButtonDisabled] = useState(true)

  console.log(name)
  const [inputs, setInputs] = useState({
    inputName: name,
    inputEmail: email,
    inputPfp: pfp,
  })
  const [errorStateHelperText, setErrorStateHelperText] = useState(
    initialErrorStateHelperText
  )
  const router = useRouter()

  const handleChange = (evt) => {
    setErrorStateHelperText(initialErrorStateHelperText)
    setInputs((prev) => {
      return {
        ...prev,
        [evt.target.name]: evt.target.value,
      }
    })
  }

  useEffect(() => {
    setInputs({
      inputName: name,
      inputEmail: email,
      inputPfp: pfp,
    })
  }, [name])

  useEffect(() => {
    if (inputs.inputEmail.length > 0 && inputs.inputName.length > 0) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }, [inputs])

  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="p-3 w-full flex gap-3 items-center">
        <span
          onClick={() => {
            router.push("/settings")
          }}
          className="w-[35px] h-[35px] border rounded-md flex justify-center items-center border-white/20 hover:border-white/80 hover:cursor-pointer"
        >
          <ChevronLeft size={25} strokeWidth={3} />
        </span>
        <span className="text-themeonsurface font-bold text-2xl">
          Edit Profile
        </span>{" "}
      </div>

      <div className=" flex flex-col justify-center gap-4 items-center p-10">
        <CustomAvatar name={name} pfp={inputs.inputPfp} />
        <div className="w-[300px] flex flex-col gap-6">
          <TextField
            sx={textFieldSx}
            fullWidth="true"
            name="inputName"
            value={inputs.inputName}
            onChange={handleChange}
            id="outlined-controlled"
            label="Name"
            type="text"
            error={errorStateHelperText.name}
            helperText={errorStateHelperText.name}
          />
          <TextField
            sx={textFieldSx}
            fullWidth="true"
            name="inputEmail"
            value={inputs.inputEmail}
            onChange={handleChange}
            id="outlined-controlled-2"
            label="Email"
            type="email"
            error={errorStateHelperText.email}
            helperText={errorStateHelperText.email}
          />

          <PrimaryButton
            // clickFunction={}
            disabled={buttonDisabled}
            width="100%"
            height="40px"
            buttonText="Save"
          />
        </div>
      </div>
    </div>
  )
}