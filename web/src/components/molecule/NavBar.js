import React, { useState, useEffect } from "react"
import tw from "twin.macro"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons"
import { useStateContext } from "../../context/StateContext"
import { Link } from "gatsby"
import { SideBarToggle } from "../atom/SideBarToggle"
import { motion } from "framer-motion"
import SideBarMenu from "../atom/SideBarMenu"
import Cart from "./Cart"
function NavBar() {
  const { showCart, setShowCart, isOpen, toggleOpen } = useStateContext()
  const [isDesktop, setDesktop] = useState(true)

  const updateMedia = () => {
    if (typeof window !== `undefined`) {
      setDesktop(window.innerWidth > 650)
    }
  }

  useEffect(() => {
    if (typeof window !== `undefined`) {
      window.addEventListener("resize", updateMedia)
      return () => window.removeEventListener("resize", updateMedia)
    }
  })

  // On resize checks whether screen width is above 650, if it is above 650 isDesktop will be set to true

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
        <Wrapper>
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
        </Wrapper>
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
            <SideBarToggle toggle={() => toggleOpen()} />
            <SideBarMenu />
          </motion.div>
          <Cart />
        </>
      )}
    </>
  )
}

export default NavBar

const Wrapper = tw.div`flex justify-between px-10 py-2 items-center `
