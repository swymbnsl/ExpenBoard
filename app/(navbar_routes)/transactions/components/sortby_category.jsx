import {
  ArrowDownAZ,
  ArrowDownNarrowWide,
  ArrowDownWideNarrow,
  ArrowDownZA,
} from "lucide-react"
import React from "react"

export default function SortByCategory({ propertyName, sortBy, setSortBy }) {
  return (
    <div
      onClick={() => {
        setSortBy({
          property: propertyName,
          descending:
            sortBy.property == propertyName ? !sortBy.descending : true,
        })
      }}
      className={
        (sortBy.property == propertyName
          ? "bg-themeonsurface text-themesurface"
          : "bg-transparent hover:bg-themesurfacedim text-themeonsurface") +
        " w-[43%] h-[50px] border-themeonsurfacedim hover:cursor-pointer border rounded-lg flex justify-between p-3 items-center font-semibold text-sm"
      }
    >
      {propertyName == "dateAndTime"
        ? "Date"
        : propertyName[0].toUpperCase() +
          propertyName.slice(1, propertyName.length)}{" "}
      {sortBy.property == propertyName ? (
        !sortBy.descending ? (
          propertyName == "name" || propertyName == "category" ? (
            <ArrowDownAZ size={20} />
          ) : (
            <ArrowDownNarrowWide size={20} />
          )
        ) : propertyName == "name" || propertyName == "category" ? (
          <ArrowDownZA size={20} />
        ) : (
          <ArrowDownWideNarrow size={20} />
        )
      ) : (
        <></>
      )}
    </div>
  )
}
