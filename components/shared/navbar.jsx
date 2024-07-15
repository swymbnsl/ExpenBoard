"use client"
import { Bolt, CircleGauge, LayoutGrid, Wallet } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"

export default function Navbar() {
  const pathname = usePathname()
  const activeLink =
    "flex justify-center items-center text-sm gap-1 transition ease-in-out delay-0 duration-200"
  const inActiveLink =
    "flex  items-center text-sm gap-1 text-gray-500 transition ease-in-out delay-0 duration-200"
  return (
    <>
      <div className="w-full flex justify-center items-center px-3 py-2 fixed bottom-0 duration">
        <div className="bg-themenavbar w-full shadow-[0_5px_15px_3px] rounded-full shadow-black text-themeonsurface h-[70px] flex justify-evenly items-center z-10">
          <span
            className={
              pathname == "/dashboard" ? `${activeLink}` : `${inActiveLink}`
            }
          >
            <Link
              href="/dashboard"
              className="flex justify-center items-center gap-2"
            >
              <CircleGauge size={25} />
              {pathname == "/dashboard" && "Dashboard"}
            </Link>
          </span>
          <span
            className={
              pathname == "/transactions" ? `${activeLink}` : `${inActiveLink}`
            }
          >
            <Link
              href="/transactions"
              className="flex justify-center items-center gap-2"
            >
              <Wallet size={25} />
              {pathname == "/transactions" && "Transactions"}
            </Link>
          </span>
          <span
            className={
              pathname == "/categories" ? `${activeLink}` : `${inActiveLink}`
            }
          >
            <Link
              href="/categories"
              className="flex justify-center items-center gap-2"
            >
              <LayoutGrid size={25} />
              {pathname == "/categories" && "Categories"}
            </Link>
          </span>
          <span
            className={
              pathname == "/settings" ? `${activeLink}` : `${inActiveLink}`
            }
          >
            <Link
              href="/settings"
              className="flex justify-center items-center gap-2"
            >
              <Bolt size={25} />
              {pathname == "/settings" && "Settings"}
            </Link>
          </span>
        </div>
      </div>
    </>
  )
}

{
  /* <div className="bg-themesurfacedim fixed bottom-0 w-full shadow-lg shadow-black text-themeonsurface h-[70px] flex justify-center items-center z-10">
        <Link href="/dashboard" style={{ width:  }}>
          <span
            className={
              pathname == "/dashboard" ? `${activeLink}` : `${inActiveLink}`
            }
          >
            <Home size={25} />
            {pathname == "/dashboard" && "Dashboard"}
          </span>
        </Link>
        <Link href="/transactions" style={{ width:  }}>
          <span
            className={
              pathname == "/transactions" ? `${activeLink}` : `${inActiveLink}`
            }
          >
            <Wallet size={25} />
            {pathname == "/transactions" && "Transactions"}
          </span>
        </Link>
        <span className="bg-themeonsurface rounded-3xl size-[60px] border-black border-2 shadow-sm shadow-black  -translate-y-[30px] flex justify-center items-center ">
          <Plus color="black" size={30} strokeWidth={3} />
        </span>

        <Link href="/categories" style={{ width:  }}>
          <span
            className={
              pathname == "/categories" ? `${activeLink}` : `${inActiveLink}`
            }
          >
            <LayoutGrid size={25} />
            {pathname == "/categories" && "Categories"}
          </span>
        </Link>
        <Link href="/settings" style={{ width:  }}>
          <span
            className={
              pathname == "/settings" ? `${activeLink}` : `${inActiveLink}`
            }
          >
            <Bolt size={25} />
            {pathname == "/settings" && "Settings"}
          </span>
        </Link>
        <div className="h-full w- bg-white/10 absolute top-0 left-10 rounded-full "></div>
      </div> */
}
