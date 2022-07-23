import React, { createContext, useContext, useState, useEffect } from "react"
import { useCycle } from "framer-motion"
import tw from "twin.macro"
const Context = createContext()

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false)
  const [cart, setCart] = useState([])
  const [isOpen, toggleOpen] = useCycle(false, true)

  return (
    <Context.Provider
      value={{ showCart, setShowCart, cart, setCart, isOpen, toggleOpen }}
    >
      <div tw="flex items-center flex-col w-[100%]">{children}</div>
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context)
