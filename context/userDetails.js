"use client"
import axios from "axios"
import { createContext, useState, useEffect } from "react"

export const UserDetailsContext = createContext({})

export const UserDetailsProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    id: "",
    name: "",
    pfp: "",
    email: "",
    currency: "",
  })

  const getLocalDetails = async (ran) => {
    ran && console.log("Ran to update context")
    try {
      const res = await axios.get("/api/user/profile")

      console.log(res.data.tokenData)

      setUserData({
        id: res.data.tokenData.id,
        name: res.data.tokenData.name,
        pfp: localStorage.getItem("pfp"),
        email: res.data.tokenData.email,
        currency: res.data.tokenData.currency,
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getLocalDetails()
  }, [])

  return (
    <UserDetailsContext.Provider value={{ ...userData, getLocalDetails }}>
      {children}
    </UserDetailsContext.Provider>
  )
}
