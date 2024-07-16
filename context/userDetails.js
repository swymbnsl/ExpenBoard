"use client"
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
