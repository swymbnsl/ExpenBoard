import React from "react"

export default function DeleteButton({
  clickFunction,
  disabled,
  width,
  height,
  buttonText,
}) {
  return (
    <div
      onClick={!disabled ? clickFunction : null}
      style={{ width: width, height: height }}
      className={
        (disabled
          ? "bg-red-400/50 hover:cursor-default"
          : "hover:cursor-pointer hover:bg-red-400") +
        ` transition-all duration-100 rounded-md flex justify-center font-medium text-themesurface items-center bg-red-300`
      }
    >
      {buttonText}
    </div>
  )
}

// Copy directly:
// <DeleteButton
//clickFunction={}
//         disabled={false}
//         width={"45%"}
//         height={"40px"}
//         buttonText={"Delete"}
//       />
