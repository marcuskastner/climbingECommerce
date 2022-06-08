import React, { useState, useEffect } from "react"
import tw from "twin.macro"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons"
import { useStateContext } from "../context/StateContext"
import { Link } from "gatsby"
import { MenuToggle } from "./MenuToggle"
import { motion } from "framer-motion"
import MenuItem from "./MenuItem"
import Cart from "./Cart"
function NavBar() {
  const { showCart, setShowCart, isOpen, toggleOpen } = useStateContext()
  const [isDesktop, setDesktop] = useState(window.innerWidth > 650)

  const updateMedia = () => {
    setDesktop(window.innerWidth > 640)
  }

  useEffect(() => {
    window.addEventListener("resize", updateMedia)
    return () => window.removeEventListener("resize", updateMedia)
  })

  const sidebar = {
    open: {
      clipPath: `circle(1000px at 31px 31px)`,
      transition: {
        type: "spring",
        stiffness: 20,
        restDelta: 2,
      },
    },
    closed: {
      clipPath: "circle(24px at 31px 31px)",
      transition: {
        delay: 0.2,
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
  }

  return (
    <>
      {isDesktop ? (
        <div tw="flex justify-between px-10 py-2 items-center ">
          <span tw="font-bold text-lg">CLIMBFREE</span>
          <div tw="flex gap-10 translate-x-[-34%]">
            <span>
              <Link tw="no-underline text-[#707070]" to={"/"}>
                HOME
              </Link>
            </span>

            <span>
              <Link tw="no-underline text-[#707070]" to={"#"}>
                SHOP
              </Link>
            </span>
          </div>
          <FontAwesomeIcon
            icon={faShoppingCart}
            onClick={() => setShowCart(!showCart)}
          />
          <Cart />
        </div>
      ) : (
        <>
          <motion.div
            tw="bg-white w-[300px] absolute z-20 h-[100%] top-0 left-0"
            initial={{
              clipPath: "circle(24px at 31px 31px)",
            }}
            variants={sidebar}
            animate={isOpen ? "open" : "closed"}
          >
            <MenuToggle toggle={() => toggleOpen()} />
            <MenuItem />
          </motion.div>
          <Cart />
        </>
      )}
    </>
  )
}

export default NavBar
