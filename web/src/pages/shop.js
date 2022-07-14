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
export const Search = ({ products, productTypes }) => {
  const { setShowCart } = useStateContext()
  useEffect(() => setShowCart(false), [])

  const [filteredProducts, setFilteredProducts] = useState(products)

  // const options = [
  //   { value: "", text: "--Filter by type--" },
  //   { value: "apple", text: "Apple 🍏" },
  //   { value: "banana", text: "Banana 🍌" },
  //   { value: "kiwi", text: "Kiwi 🥝" },
  // ]

  let options = productTypes.map(type => {
    return { value: type.name, text: type.name }
  })
  options = [{ value: " ", text: "All Products" }, ...options]
  const [selected, setSelected] = useState(options[0].value)

  const handleChange = event => {
    setSelected(event.target.value)
  }
  useEffect(() => {
    setFilteredProducts(
      selected === " "
        ? products
        : products.filter(product => product.productType.name === selected)
    )
  }, [selected])

  return (
    <>
      <SearchContainer>
        <label>Filter products by type: </label>
        <select value={selected} onChange={handleChange}>
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.text}
            </option>
          ))}
        </select>
      </SearchContainer>
      <ProductContainer>
        {filteredProducts.map(product => (
          <ProductCard product={product} key={product.id} />
        ))}
      </ProductContainer>
    </>
  )
}

const shopPage = ({ data }) => {
  const products = data.product.edges.map(edge => edge.node)
  const productTypes = data.productTypes.edges.map(edge => edge.node)
  return (
    <>
      <Header tw="font-bold text-2xl">Products Page</Header>
      <Search products={products} productTypes={productTypes} />
    </>
  )
}

export default shopPage

const ProductContainer = tw.div`md:(grid-cols-2) justify-items-center grid grid-cols-1   gap-20 mb-20`

const Header = tw.div`font-bold text-2xl mt-20 mb-10`

const SearchContainer = tw.div`mb-10`
