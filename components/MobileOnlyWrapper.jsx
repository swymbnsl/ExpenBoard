"use client"

import React from "react"
import { useEffect, useState } from "react"
import { Smartphone } from "lucide-react"

const MobileOnlyWrapper = ({ children }) => {
  const [isPhone, setIsPhone] = useState(true)

  useEffect(() => {
    const checkIfPhone = () => {
      setIsPhone(window.innerWidth <= 480)
    }

    // Check initially
    checkIfPhone()

    // Add event listener for window resize
    window.addEventListener("resize", checkIfPhone)

    // Cleanup
    return () => window.removeEventListener("resize", checkIfPhone)
  }, [])

  if (!isPhone) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-themesurface text-foreground p-4">
        <div className="max-w-md text-center space-y-6">
          <Smartphone className="w-16 h-16 mx-auto text-primary" />
          <h1 className="text-2xl font-bold">Phone Only Access</h1>
          <p className="text-lg text-muted-foreground">
            For now, this website is designed only for smartphones. Please
            access it from your mobile phone.
          </p>
          <p className="text-sm text-muted-foreground">
            Tablets and desktop devices are not yet supported.
          </p>
          <div className="mt-4 p-4 bg-themesurfacedim rounded-lg">
            <p className="text-sm">
              For the best experience, please visit this website on your
              smartphone.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return children
}

export default MobileOnlyWrapper
