import React, { useState } from "react"
import { graphql } from "gatsby"
import Pagination from "../components/Pagination"
import tw from "twin.macro"
import StarRatings from "react-star-ratings"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCirclePlus, faCircleMinus } from "@fortawesome/free-solid-svg-icons"
import { useStateContext } from "../context/StateContext"

export const query = graphql`
  query ProductTemplateQuery($id: String!) {
    Product: sanityProduct(id: { eq: $id }) {
      name
      price
      rating
      id
      desc {
        children {
          text
        }
      }
      images {
        asset {
          url
          gatsbyImageData
          id
        }
      }
      options {
        optionName
        optionValues
      }
    }
  }
`

const ProductTemplate = ({ data }) => {
  const { Product } = data
  const { images } = Product
  const [selectedOption, setSelectedOption] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const { cart, setCart } = useStateContext()

  return (
    <div
      className="main_container"
      tw=" md:(flex justify-around gap-10)  mt-10 p-4"
    >
      <div className="left">
        <Pagination images={images} />
        <p tw="mt-10">{Product.desc[0].children[0].text}</p>
      </div>
      <div className="right">
        <h1>{Product.name}</h1>
        <StarRatings
          rating={Product.rating}
          numberOfStars={5}
          starRatedColor="red"
          starEmptyColor="grey"
        />
        <p>{Product.price}</p>
        <p>{Product.options[0].optionName}</p>
        <div tw="flex gap-4">
          {Product.options[0].optionValues.map((value, i) => (
            <div
              style={
                selectedOption === i
                  ? { padding: "0.5rem 1rem", border: "2px solid red" }
                  : { padding: "0.5rem 1rem", border: "2px solid grey" }
              }
              onClick={() => {
                setSelectedOption(i)
              }}
            >
              {value}
            </div>
          ))}
        </div>
        <p>Quantity</p>
        <div tw="flex items-center justify-center gap-4 mb-8">
          <button
            onClick={() =>
              quantity > 1 ? setQuantity(quantity - 1) : setQuantity(1)
            }
          >
            <FontAwesomeIcon icon={faCircleMinus} />
          </button>
          <div tw="border-2 border-solid  border-black px-4 py-4">
            {quantity}
          </div>
          <button onClick={() => setQuantity(quantity + 1)}>
            <FontAwesomeIcon icon={faCirclePlus} />
          </button>
        </div>
        <CartButton
          onClick={() => {
            const cartCopy = cart
            const item = {
              name: Product.name,
              id: Product.id,
              image: Product.images[0].asset.gatsbyImageData,
              optionIndex: selectedOption,
              optionValue: Product.options[0].optionValues[selectedOption],
              optionName: Product.options[0].optionName,
              quantity: quantity,
              price: Product.price,
            }
            const idArray = cart.map(cartItem => cartItem.id)

            if (idArray.includes(item.id)) {
              const matchingArray = idArray.map((cartId, i) => {
                if (cartId === item.id) return cartCopy[i].optionIndex
              })
              if (matchingArray.includes(item.optionIndex)) {
                cartCopy.forEach(cartItem => {
                  if (
                    cartItem.id === item.id &&
                    cartItem.optionIndex === item.optionIndex
                  )
                    cartItem.quantity += item.quantity
                })
              } else {
                cartCopy.push(item)
                setCart(cartCopy)
              }
            } else {
              cartCopy.push(item)
              setCart(cartCopy)
            }
          }}
        >
          Add to Cart
        </CartButton>
      </div>
    </div>
  )
}

export default ProductTemplate

const CartButton = tw.button`w-[20rem] h-[3rem] bg-[#215140] text-white`
