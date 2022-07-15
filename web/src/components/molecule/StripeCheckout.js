import React from "react"
import tw from "twin.macro"
import { loadStripe } from "@stripe/stripe-js"

const stripePromise = loadStripe(
  "pk_test_51L8U37HXmZLSQcfIXCEKsyUDO0sn1oMZFT8mRVyMfyUwzD5pQ7NVGniCuemv0UUWiLSiB3GMzck1bzfvSBIqAuLT00NtXcnW4R"
)

function StripeCheckout({ cart }) {
  const lineItemsArr = cart.map(item => {
    return { price: item.priceId, quantity: item.quantity }
  })

  const checkoutOptions = {
    mode: "payment",
    lineItems: lineItemsArr,
    successUrl: "http://localhost:8000",
    cancelUrl: "http://localhost:8000",
  }

  const redirectToCheckout = async () => {
    const stripe = await stripePromise
    const result = await stripe.redirectToCheckout(checkoutOptions)
  }

  return (
    <CheckoutButton onClick={redirectToCheckout}>
      Proceed To Checkout
    </CheckoutButton>
  )
}

export default StripeCheckout

const CheckoutButton = tw.button`w-[18rem] h-[3rem] bg-[#215140] text-white`
