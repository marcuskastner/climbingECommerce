import React, { useEffect } from "react"
import { graphql } from "gatsby"
import Seo from "../components/seo"
import ProductCard from "../components/molecule/ProductCard"
import { GatsbyImage } from "gatsby-plugin-image"
import tw from "twin.macro"
import Hero from "../components/molecule/Hero"
import { useStateContext } from "../context/StateContext"

export const query = graphql`
  query IndexPageQuery {
    site: sanitySite(_id: {}) {
      title
    }
    index: sanityIndex {
      sale
      title
      mainImage {
        asset {
          gatsbyImageData
        }
      }
    }
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
              gatsbyImageData
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
        }
      }
    }
  }
`

const IndexPage = ({ data }) => {
  const products = data.product.edges.map(edge => edge.node)
  const { site, index } = data
  const imageData = index.mainImage[0].asset.gatsbyImageData
  const { setShowCart } = useStateContext()
  useEffect(() => setShowCart(false), [])

  return (
    <>
      <Seo site={site} />

      <div tw="relative mb-10 ">
        {/* twin does not work on Gatsby Components */}
        <GatsbyImage image={imageData} alt="main index image" />
        <Hero />
      </div>

      <ProductContainer>
        {products.map(product => (
          <ProductCard product={product} key={product.id} />
        ))}
      </ProductContainer>
    </>
  )
}

export default IndexPage

const ProductContainer = tw.div`lg:(flex-row gap-24  ) flex flex-col items-center gap-20 justify-center`
