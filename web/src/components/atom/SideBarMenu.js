import * as React from "react"
import { motion } from "framer-motion"
import { useStateContext } from "../../context/StateContext"
import MenuItem from "./MenuItem"

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
}

const SideBarMenu = () => {
  const { isOpen } = useStateContext()
  return (
    <motion.ui animate={isOpen ? "open" : "closed"} variants={variants}>
      <MenuItem />
    </motion.ui>
  )
}

export default SideBarMenu
