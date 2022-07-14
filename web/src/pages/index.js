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
  }
`

const IndexPage = ({ data }) => {
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
    </>
  )
}

export default IndexPage
