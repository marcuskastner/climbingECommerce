import React from "react"
import { graphql } from "gatsby"

import Seo from "../components/seo"
import Product from "../components/Product"
import { GatsbyImage } from "gatsby-plugin-image"
import tw from "twin.macro"
import Title from "../components/Title"

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

const IndexPage = props => {
  const { data } = props
  const products = data.product.edges.map(edge => edge.node)
  const site = data.site
  const index = data.index
  const imageData = index.mainImage[0].asset.gatsbyImageData

  return (
    <>
      <Seo site={site} />

      <div tw="relative mb-10 ">
        <GatsbyImage image={imageData} alt="main index image" />
        <Title />
      </div>
      <div tw="flex justify-center items-center ">
        <div tw="xl:(grid gap-24 grid-cols-2) flex flex-col items-center gap-20">
          {products.map(product => (
            <Product product={product} key={product.id} />
          ))}
        </div>
      </div>
    </>
  )
}

const Button = tw.button`md:(w-[8rem] h-[2.35rem] bg-white text-black font-semibold text-[1rem]) `

export default IndexPage
