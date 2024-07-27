"use client"
import DeleteConfirmationDialog from "@/components/shared/delete_confirmation_dialog"
import { showErrorToast, showSuccessToast } from "@/utils/hot-toast"
import { Fab } from "@mui/material"
import axios from "axios"
import { Pencil, Plus, Trash } from "lucide-react"
import React, { useEffect, useState } from "react"
import EditCategorySheet from "./edit_category_sheet"

export default function Categories() {
  const [incomeCategories, setIncomeCategories] = useState([])
  const [expensesCategories, setExpensesCategories] = useState([])
  const [activeCategories, setActiveCategories] = useState("income")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [isDeleteDisabled, setIsDeleteDisabled] = useState(false)
  const [deleteCategory, setDeleteCategory] = useState("")
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [editCategoryName, setEditCategoryName] = useState("")
  const [editCategoryOldName, setEditCategoryOldName] = useState("")
  const [errorStateHelperText, setErrorStateHelperText] = useState("")
  const [isEditingCategory, setIsEditingCategory] = useState(false)
  const [buttonDisabled, setButtonDisabled] = useState(true)

  const getCategories = async () => {
    const res = await axios.get("/api/user/categories")
    setIncomeCategories(res.data.incomeCategories)
    setExpensesCategories(res.data.expensesCategories)
  }

  useEffect(() => {
    getCategories()
  }, [])

  const handleCategoryDelete = async (activeCategories, deleteCategory) => {
    try {
      const res = await axios.delete(
        `/api/user/categories?deleteCategory=${deleteCategory}&categoryType=${activeCategories}`
      )
      showSuccessToast(res.data.message)
    } catch (error) {
      console.log(error)
      showErrorToast(error.response.data.error)
    } finally {
      setDeleteDialogOpen(false)
    }
  }

  const handleCategoryEdit = async () => {
    try {
      const res = await axios.patch("/api/user/categories", {
        name: editCategoryOldName,
        type: activeCategories,
        newName: editCategoryName,
      })
      showSuccessToast(res.data.message)
    } catch (error) {
      console.log(error)
      if (error.response.data.validationError) {
        setErrorStateHelperText(error.response.data.errorHelperText)
        return
      }
      showErrorToast(error.response.data.error)
    } finally {
      getCategories()
      setIsSheetOpen(false)
    }
  }

  const deleteClickFunction = async () => {
    setIsDeleteDisabled(true)

    await handleCategoryDelete(activeCategories, deleteCategory)
    getCategories()
    setIsDeleteDisabled(false)
  }

  return (
    <div className="w-full h-full">
      {/* {isSheetOpen || deleteDialogOpen || isLoading ? (
        <></>
      ) : ( */}
      <Fab
        onClick={() => {
          setType("create")
          setIsSheetOpen(true)
        }}
        variant="extended"
        color="white"
        aria-label="add"
        className="fixed bg-themeonsurface text-lg font-semibold text-themesurface bottom-[90px] right-3 shadow-black shadow-[0_0_30px_2px]"
      >
        <Plus style={{ marginRight: "10px" }} strokeWidth={3} size={20} />
        Add
      </Fab>
      {/* )
      } */}

      <EditCategorySheet
        activeCategories={activeCategories}
        handleCategoryEdit={handleCategoryEdit}
        errorStateHelperText={errorStateHelperText}
        buttonDisabled={buttonDisabled}
        setButtonDisabled={setButtonDisabled}
        isEditingCategory={isEditingCategory}
        setIsEditingCategory={setIsEditingCategory}
        setEditCategoryName={setEditCategoryName}
        editCategoryName={editCategoryName}
        isSheetOpen={isSheetOpen}
        setIsSheetOpen={setIsSheetOpen}
      />

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
        <div className="p-3 pb-24">
          {incomeCategories
            ? incomeCategories.map((c, i) => {
                return (
                  <div
                    className="text-white flex justify-between items-center bg-themesurfacedim m-2 p-3 rounded-e-xl "
                    key={i}
                  >
                    <div className="flex gap-2">
                      <span className="font-semibold">{i + 1}: </span>
                      <span>{c}</span>
                    </div>
                    <div className="flex gap-2">
                      <Pencil
                        onClick={() => {
                          setEditCategoryName(c)
                          setEditCategoryOldName(c)

                          setIsSheetOpen(true)
                        }}
                        strokeWidth={2.5}
                        size={20}
                        className="hover:cursor-pointer hover:text-themeonsurfacevar text-themeonsurface"
                      />
                      <Trash
                        onClick={() => {
                          setDeleteCategory(c)
                          setDeleteDialogOpen(true)
                        }}
                        strokeWidth={2.5}
                        size={20}
                        className="hover:cursor-pointer hover:text-red-400 text-red-300"
                      />
                    </div>
                  </div>
                )
              })
            : ""}
        </div>
      ) : (
        <div className="p-3 pb-24">
          {expensesCategories
            ? expensesCategories.map((c, i) => {
                return (
                  <div
                    className="text-white flex justify-between items-center bg-themesurfacedim m-2 p-3 rounded-e-xl "
                    key={i}
                  >
                    <div className="flex gap-2">
                      <span className="font-semibold">{i + 1}: </span>
                      <span>{c}</span>
                    </div>
                    <div className="flex gap-2">
                      <Pencil
                        onClick={() => {
                          setEditCategoryName(c)
                          setEditCategoryOldName(c)

                          setIsSheetOpen(true)
                        }}
                        strokeWidth={2.5}
                        size={20}
                        className="hover:cursor-pointer hover:text-themeonsurfacevar text-themeonsurface "
                      />
                      <Trash
                        onClick={() => {
                          setDeleteCategory(c)
                          setDeleteDialogOpen(true)
                        }}
                        strokeWidth={2.5}
                        size={20}
                        className="hover:cursor-pointer hover:text-red-400 text-red-300"
                      />
                    </div>
                  </div>
                )
              })
            : ""}
        </div>
      )}
      <DeleteConfirmationDialog
        title="Delete this category?"
        description="All transactions falling under this category will be marked as uncategorized "
        deleteClickFunction={deleteClickFunction}
        isDeleteDisabled={isDeleteDisabled}
        setDeleteDialogOpen={setDeleteDialogOpen}
        deleteDialogOpen={deleteDialogOpen}
      />
    </div>
  )
}
