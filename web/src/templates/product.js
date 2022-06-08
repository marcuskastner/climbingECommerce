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
      tw=" lg:(grid grid-cols-3)gap-10 flex flex-col mt-10 p-4 justify-center"
    >
      <div className="right" tw="lg:(order-last col-span-1)">
        <h1 tw="text-4xl font-bold mb-4">{Product.name}</h1>
        <StarRatings
          rating={Product.rating}
          numberOfStars={5}
          starRatedColor="#EF8B23"
          starEmptyColor="grey"
          starDimension="30px"
        />
        <p tw="text-3xl font-bold my-4">${Product.price}</p>
        <p tw="text-2xl font-semibold mb-2">{Product.options[0].optionName}</p>
        <div tw="flex gap-4 mb-4">
          {Product.options[0].optionValues.map((value, i) => (
            <div
              style={
                selectedOption === i
                  ? {
                      padding: "0.5rem 1rem",
                      border: "2px solid red",
                      borderRadius: "5%",
                      marginBottom: "0.5rem",
                    }
                  : {
                      padding: "0.5rem 1rem",
                      border: "2px solid grey",
                      borderRadius: "5%",
                      marginBottom: "0.5rem",
                    }
              }
              onClick={() => {
                setSelectedOption(i)
              }}
            >
              <span tw="font-semibold">{value}</span>
            </div>
          ))}
        </div>
        <p tw="text-2xl font-semibold mb-2">Quantity</p>
        <div tw="flex items-center  gap-4 mb-8">
          <button
            onClick={() =>
              quantity > 1 ? setQuantity(quantity - 1) : setQuantity(1)
            }
          >
            <FontAwesomeIcon icon={faCircleMinus} />
          </button>
          <div tw="border-2 border-solid  border-gray-500 rounded-[10%] px-8 py-3">
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
      <div className="left" tw="lg:col-span-2">
        <Pagination images={images} />
        <p tw="px-8 mt-10">{Product.desc[0].children[0].text}</p>
      </div>
    </div>
  )
}

export default ProductTemplate

const CartButton = tw.button`w-[20rem] h-[3rem] bg-[#215140] text-white`
