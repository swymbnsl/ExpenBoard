import React from "react"

export default function SecondaryButton({
  clickFunction,
  width,
  height,
  buttonText,
}) {
  return (
    <div
      onClick={clickFunction}
      style={{ width: width, height: height }}
      className={`hover:cursor-pointer hover:bg-themesurfacedim transition-all duration-100 rounded-md flex justify-center items-center font-medium bg-transparent border border-white/20`}
    >
      {buttonText}
    </div>
  )
}

// Copy directly:
// <SecondaryButton
//clickFunction={}
//         width={"45%"}
//         height={"40px"}
//         buttonText={"Cancel"}
//       />
