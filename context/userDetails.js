"use client"
// import { showErrorToast } from "@/utils/hot-toast"
import axios from "axios"
import { createContext, useState, useEffect } from "react"

export const UserDetailsContext = createContext({})

export const UserDetailsProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    name: "",
    pfp: "",
    email: "",
  })

  const getLocalDetails = async () => {
    try {
      const res = await axios.get("/api/user/profile")

      setUserData({
        name: res.data.tokenData.name,
        pfp: res.data.tokenData.pfp,
      })
    } catch (error) {
      // showErrorToast("Error loading data")
      console.log(error)
    }
  }

  useEffect(() => {
    getLocalDetails()
  }, [])

  return (
    <UserDetailsContext.Provider value={userData}>
      {children}
    </UserDetailsContext.Provider>
  )
}
