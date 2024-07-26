"use client"
import axios from "axios"
import React, { useEffect, useState } from "react"

export default function Categories() {
  const [incomeCategories, setIncomeCategories] = useState([])
  const [expensesCategories, setExpensesCategories] = useState([])
  const [activeCategories, setActiveCategories] = useState("income")

  const getCategories = async () => {
    const res = await axios.get("/api/user/categories")
    setIncomeCategories(res.data.incomeCategories)
    setExpensesCategories(res.data.expensesCategories)
  }

  useEffect(() => {
    getCategories()
  }, [])

  return (
    <div className="w-full h-full">
      <div className="p-3">
        <span className="text-themeonsurface font-bold text-2xl">
          Categories
        </span>
      </div>
      <div className="w-full flex p-3 justify-center">
        <div className=" flex justify-center relative w-[100%]">
          <div
            onClick={() => {
              setActiveCategories("income")
            }}
            className={
              (activeCategories == "income"
                ? "text-themesurface"
                : "text-themeonsurface") +
              " w-[50%] hover:cursor-pointer transition-all duration-300 h-[40px] flex justify-center items-center text-lg font-medium"
            }
          >
            Income
          </div>
          <div
            onClick={() => {
              setActiveCategories("expense")
            }}
            className={
              (activeCategories == "expense"
                ? "text-themesurface"
                : "text-themeonsurface") +
              " w-[50%] hover:cursor-pointer transition-all duration-300 h-[40px] flex justify-center items-center text-lg font-medium"
            }
          >
            Expense
          </div>
          <div
            className={
              (activeCategories == "income"
                ? "bg-green-300"
                : "bg-red-300 translate-x-[100%]") +
              " w-[50%] -z-10 rounded-lg transition-all duration-300 ease-in-out h-full absolute bottom-0 left-0"
            }
          ></div>
        </div>
      </div>
      {activeCategories == "income" ? (
        <div className="p-3">
          {incomeCategories
            ? incomeCategories.map((c, i) => {
                return (
                  <div className="text-white" key={i}>
                    {c}
                  </div>
                )
              })
            : ""}
        </div>
      ) : (
        <div className="p-3">
          {expensesCategories
            ? expensesCategories.map((c, i) => {
                return (
                  <div className="text-white" key={i}>
                    {c}
                  </div>
                )
              })
            : ""}
        </div>
      )}
    </div>
  )
}
