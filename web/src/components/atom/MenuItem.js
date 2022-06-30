import React from "react"
import { motion } from "framer-motion"
import tw from "twin.macro"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faHouseChimney,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons"
import { Link } from "gatsby"
import { useStateContext } from "../../context/StateContext"

const item = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
}

function MenuItem() {
  const { toggleOpen, showCart, setShowCart } = useStateContext()

  return (
    <>
      <motion.li
        tw="list-none text-[24px] px-4"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        variants={item}
      >
        <Link
          tw="no-underline text-black"
          to={"/"}
          onClick={() => {
            toggleOpen()
            setShowCart(false)
          }}
        >
          <div tw="flex gap-4 items-center">
            <FontAwesomeIcon tw="w-[30px]" icon={faHouseChimney} />

            <span>Home</span>
          </div>
        </Link>
      </motion.li>
      <motion.li
        tw="list-none text-[24px] px-4"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        variants={item}
      >
        <div
          tw="flex gap-4 items-center"
          onClick={() => {
            toggleOpen()
            setShowCart(!showCart)
          }}
        >
          <FontAwesomeIcon tw="w-[30px]" icon={faCartShopping} />
          <span>Cart</span>
        </div>
      </motion.li>
    </>
  )
}

export default MenuItem
