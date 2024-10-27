"use client"
import { UserDetailsContext } from "@/context/userDetails"
import React, { useCallback, useContext, useEffect, useState } from "react"
import CustomAvatar from "./custom_Avatar"
import { ChevronLeft } from "lucide-react"
import { TextField } from "@mui/material"
import PrimaryButton from "@/components/buttons/primary_button"
import { useRouter } from "next/navigation"
import { textFieldSx } from "@/components/styles-sx/textfield_sx"
import CropImageSheet from "./crop_image_sheet"
import { showErrorToast, showSuccessToast } from "@/utils/hot-toast"
import axios from "axios"

export default function Profile() {
  const initialErrorStateHelperText = {
    name: "",
    email: "",
  }
  const { name, pfp, email, getLocalDetails, currency } =
    useContext(UserDetailsContext)
  const [buttonDisabled, setButtonDisabled] = useState(true)
  const [saving, setSaving] = useState(false)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [selectedImageBase64String, setSelectedImageBase64String] =
    useState(null)

  const [inputs, setInputs] = useState({
    inputName: "",
    inputEmail: "",
    inputPfp: "",
    currency,
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
      currency,
    })
  }, [name, email, pfp, currency])

  useEffect(() => {
    if (
      inputs.inputEmail &&
      inputs.inputName &&
      inputs.inputEmail.length > 0 &&
      inputs.inputName.length > 0
    ) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }, [inputs])

  const handlePfpChange = (croppedImage) => {
    setInputs((prev) => {
      return {
        ...prev,
        ["inputPfp"]: croppedImage,
      }
    })
    setIsSheetOpen(false)
  }

  const handleSave = async () => {
    try {
      setSaving(true)
      const res = await axios.patch("/api/user/profile", {
        name: inputs.inputName,
        email: inputs.inputEmail,
        pfp: inputs.inputPfp,
        currency,
      })
      localStorage.setItem("pfp", inputs.inputPfp)
      getLocalDetails()
      showSuccessToast(res.data.message)
      router.refresh()
    } catch (error) {
      if (error.response.data.joiError) {
        const key = error.response.data.joiRes.error.details[0].context.key
        const msg = error.response.data.joiRes.error.details[0].message
        if (key !== "pfp" && key !== "currency") {
          setErrorStateHelperText((prevText) => {
            return {
              ...prevText,
              [key]: msg,
            }
          })
          console.log(error)
          return
        }
        console.log(error)
        showErrorToast(error.response.data.error)
        return
      }

      console.log(error)
      showErrorToast(error.response.data.error)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="w-full h-full flex flex-col items-center">
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
          Edit Profile
        </span>{" "}
      </div>

      <div className=" flex flex-col justify-center gap-4 items-center p-10">
        <CustomAvatar
          setSelectedImageBase64String={setSelectedImageBase64String}
          setIsSheetOpen={setIsSheetOpen}
          name={name}
          pfp={inputs.inputPfp}
        />
        <div className="w-[300px] flex flex-col gap-6">
          <TextField
            sx={textFieldSx}
            fullWidth="true"
            name="inputName"
            value={inputs.inputName || ""}
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
            value={inputs.inputEmail || ""}
            onChange={handleChange}
            id="outlined-controlled-2"
            label="Email"
            type="email"
            error={errorStateHelperText.email}
            helperText={errorStateHelperText.email}
          />

          <PrimaryButton
            clickFunction={handleSave}
            disabled={buttonDisabled || saving}
            width="100%"
            height="40px"
            buttonText={saving ? "Saving..." : "Save"}
          />
          {selectedImageBase64String && (
            <CropImageSheet
              handlePfpChange={handlePfpChange}
              setSelectedImageBase64String={setSelectedImageBase64String}
              selectedImageBase64String={selectedImageBase64String}
              isSheetOpen={isSheetOpen}
              setIsSheetOpen={setIsSheetOpen}
            />
          )}
        </div>
      </div>
    </div>
  )
}
