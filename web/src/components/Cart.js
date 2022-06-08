import React from "react"
import tw from "twin.macro"
import { motion, AnimatePresence } from "framer-motion"
import { useStateContext } from "../context/StateContext"
import { GatsbyImage } from "gatsby-plugin-image"
function Cart() {
  const { showCart, cart } = useStateContext()

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
          tw=" bg-white z-10 w-[75%] sm:(w-[50%] top-10 right-8) absolute right-0 top-0 h-[100%] border-2 border-solid border-b-gray-500 "
        >
          {cart.length > 0 ? (
            <div tw="w-[100%]">
              <div tw="flex justify-between">
                <div>
                  <span>{totalItems}</span>
                  <span>items in cart</span>
                </div>
                <div>
                  <p>Cart Subtotal</p>
                  <p>${totalPrice}</p>
                </div>
              </div>
              <CheckoutButton>Proceed to Checkout</CheckoutButton>
              {cart.map(item => (
                <div tw="flex justify-between">
                  <div tw="w-[20%]">
                    <GatsbyImage image={item.image} />
                  </div>
                  <div tw="flex flex-col w-[70%]">
                    <p>{item.name}</p>
                    <p>{item.price}</p>
                    <p>
                      {item.optionName}: {item.optionValue}
                    </p>
                    <p>Qty: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            "nothing to show"
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Cart

const CheckoutButton = tw.button`w-[18rem] h-[3rem] bg-[#215140] text-white`
