import React from "react"

export default function PrimaryButton({
  clickFunction,
  disabled,
  width,
  height,
  buttonText,
}) {
  return (
    <div
      onClick={clickFunction}
      className={
        (disabled
          ? "bg-themeonsurfacevar/50"
          : "hover:cursor-pointer hover:bg-themeonsurfacevar") +
        ` transition-all duration-100 w-[${width}] h-[${height}] rounded-md flex justify-center text-themesurface items-center font-medium bg-themeonsurface`
      }
    >
      {buttonText}
    </div>
  )
}

// Copy directly:
// <PrimaryButton
//         disabled={false}
//         width={"45%"}
//         height={"40px"}
//         buttonText={"Click Me"}
//       />
