import React, { useState, useEffect } from "react"
import tw from "twin.macro"
import { graphql } from "gatsby"
import ProductCard from "../components/molecule/ProductCard"
import { useStateContext } from "../context/StateContext"

export const query = graphql`
  query ShopPageQuery {
    product: allSanityProduct {
      edges {
        node {
          brand {
            name
          }
          desc {
            children {
              text
            }
          }
          id
          images {
            asset {
              id
            }
          }
          name
          price
          options {
            optionName
            optionValues
          }
          rating
          slug {
            current
          }
          productType {
            name
          }
        }
      }
    }
    productTypes: allSanityProductTypes {
      edges {
        node {
          name
        }
      }
    }
  }
`
export const Search = () => {
  const { setShowCart } = useStateContext()

  useEffect(() => setShowCart(false), [])
  const options = [
    { value: "", text: "--Filter by type--" },
    { value: "apple", text: "Apple 🍏" },
    { value: "banana", text: "Banana 🍌" },
    { value: "kiwi", text: "Kiwi 🥝" },
  ]

  const [selected, setSelected] = useState(options[0].value)

  const handleChange = event => {
    console.log(event.target.value)
    setSelected(event.target.value)
  }

  return (
    <SearchContainer>
      <select value={selected} onChange={handleChange}>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
    </SearchContainer>
  )
}

const shopPage = ({ data }) => {
  const products = data.product.edges.map(edge => edge.node)

  return (
    <>
      <Header tw="font-bold text-2xl">Products Page</Header>
      <Search />
      <ProductContainer>
        {products.map(product => (
          <ProductCard product={product} key={product.id} />
        ))}
      </ProductContainer>
    </>
  )
}

export default shopPage

const ProductContainer = tw.div`md:(grid-cols-2) justify-items-center grid grid-cols-1   gap-20`

const Header = tw.div`font-bold text-2xl mt-20 mb-10`

const SearchContainer = tw.div`mb-10`
