import { createContext, useContext } from "react"

export const dataContext = createContext(undefined)

export function useDataContext() {
  const user = useContext(dataContext)
  return user
}
