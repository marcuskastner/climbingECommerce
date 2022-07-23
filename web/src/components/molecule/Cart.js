import React, { useState, useEffect } from "react"
import tw from "twin.macro"
import { motion, AnimatePresence } from "framer-motion"
import { useStateContext } from "../../context/StateContext"
import { GatsbyImage } from "gatsby-plugin-image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons"
import StripeCheckout from "./StripeCheckout"

function Cart() {
  const { showCart, cart, setCart } = useStateContext()

  // useEffect(() => {
  //   localStorage.setItem("cart", JSON.stringify(cart))
  // }, [cart])

  const variants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
    exit: { opacity: 0 },
  }

  const calcTotalItems = () => {
    let total = 0
    cart.forEach(item => (total += item.quantity))
    return total
  }
  const totalItems = calcTotalItems()

  const calcTotalPrice = () => {
    let total = 0
    cart.forEach(item => (total += item.price * item.quantity))
    return total
  }
  const totalPrice = calcTotalPrice()

  return (
    <AnimatePresence>
      {showCart && (
        <motion.div
          animate="visible"
          exit="exit"
          initial="hidden"
          variants={variants}
          tw=" bg-white z-10 w-[100%] top-14 sm:(max-w-[400px] top-10 right-8) absolute right-0  border-2 border-solid  "
        >
          {cart.length > 0 ? (
            <div tw="flex flex-col gap-4 p-4 divide-y-[2px]">
              <div tw="pt-2">
                <div tw="flex justify-between">
                  <div>
                    <span tw="text-[1.25rem] font-semibold">{totalItems}</span>
                    <span tw="text-[1.25rem]">
                      {" "}
                      {totalItems > 1 ? "items" : "item"} in cart
                    </span>
                  </div>

                  <div tw="flex flex-col items-end">
                    <p tw="text-[1.25rem] mb-0 ">Cart Subtotal:</p>
                    <p tw="text-[1.25rem] mb-2 font-bold ">${totalPrice}</p>
                  </div>
                </div>
                <div tw="flex justify-center">
                  <StripeCheckout cart={cart} />
                </div>
              </div>
              {cart.map((item, i) => (
                <div tw="flex justify-between items-center gap-4 pt-2" key={i}>
                  <div tw="w-[20%]">
                    <GatsbyImage image={item.image} alt="item image" />
                  </div>
                  <div tw="flex flex-col w-[70%]">
                    <span>{item.name}</span>
                    <span>{item.price}</span>
                    <span>
                      {item.optionName}: {item.optionValue}
                    </span>
                    <span>Qty: {item.quantity}</span>
                  </div>
                  <FontAwesomeIcon
                    icon={faCircleXmark}
                    onClick={() =>
                      setCart(
                        cart.filter(cartItem => {
                          if (
                            cartItem.id !== item.id ||
                            cartItem.optionIndex !== item.optionIndex
                          )
                            return cartItem
                        })
                      )
                    }
                  />
                </div>
              ))}
            </div>
          ) : (
            <div tw="flex justify-center">
              <p tw="text-xl p-4 mb-0">You do not have any items in the cart</p>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Cart
