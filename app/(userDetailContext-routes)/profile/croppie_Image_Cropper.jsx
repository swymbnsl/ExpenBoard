import React, { useEffect, useRef } from "react"
import Croppie from "croppie"
import "croppie/croppie.css"
import PrimaryButton from "@/components/buttons/primary_button"

const ImageCropper = ({ selectedImageBase64String, handlePfpChange }) => {
  const croppieRef = useRef(null)
  const croppieInstance = useRef(null)

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
    if (croppieInstance.current && selectedImageBase64String) {
      const img = new Image()
      img.src = selectedImageBase64String
      img.onload = () => {
        croppieInstance.current
          .bind({
            url: selectedImageBase64String,
          })
          .catch((error) => console.error("Croppie bind error:", error))
      }
      img.onerror = (error) => {
        console.error("Image failed to load:", error)
      }
    }
  }, [selectedImageBase64String])

  const handleCrop = async () => {
    try {
      const croppedImage = await croppieInstance.current.result({
        type: "base64",
        size: "viewport",
      })

      handlePfpChange(croppedImage)
    } catch (error) {
      console.log("Cropping error:", error)
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
