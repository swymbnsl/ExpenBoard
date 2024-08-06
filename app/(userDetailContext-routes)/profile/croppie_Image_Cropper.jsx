import React, { useEffect, useRef, useState } from "react"
import Croppie from "croppie"
import "croppie/croppie.css"
import PrimaryButton from "@/components/buttons/primary_button"

const ImageCropper = ({ selectedImageBase64String, handlePfpChange }) => {
  const croppieRef = useRef(null)
  const croppieInstance = useRef(null)
  const firstRender = useRef(0)
  const [croppedImage, setCroppedImage] = useState(null)

  useEffect(() => {
    croppieInstance.current = new Croppie(croppieRef.current, {
      enableExif: true,
      viewport: {
        width: 200,
        height: 200,
        type: "circle",
      },
      boundary: {
        width: 300,
        height: 300,
      },
    })

    return () => {
      if (croppieInstance.current) {
        croppieInstance.current.destroy()
      }
    }
  }, [])

  useEffect(() => {
    try {
      if (firstRender.current == 0) {
        firstRender.current = +1
        return
      }
      if (selectedImageBase64String) {
        croppieInstance.current.bind({
          url: selectedImageBase64String,
        })
      }
    } catch (error) {
      console.log(error)
    }
  }, [selectedImageBase64String])

  const handleCrop = async () => {
    try {
      const croppedImage = await croppieInstance.current.result({
        type: "base64",
        size: "viewport",
      })

      setCroppedImage(croppedImage)
      handlePfpChange(croppedImage)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      {selectedImageBase64String && (
        <div id="upload-demo" ref={croppieRef}></div>
      )}
      <PrimaryButton
        clickFunction={handleCrop}
        disabled={false}
        width="100%"
        height="40px"
        buttonText="Done"
      />
    </div>
  )
}

export default ImageCropper
