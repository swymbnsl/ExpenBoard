"use client"
import axios from "axios"
import { createContext, useState, useEffect } from "react"

export const UserDetailsContext = createContext({})

export const UserDetailsProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    name: "",
    pfp: "",
    email: "",
    currency: "",
  })

  const getLocalDetails = async () => {
    try {
      const res = await axios.get("/api/user/profile")

      setUserData({
        id: res.data.tokenData.id,
        name: res.data.tokenData.name,
        pfp: res.data.tokenData.pfp,
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
    <UserDetailsContext.Provider value={userData}>
      {children}
    </UserDetailsContext.Provider>
  )
}
