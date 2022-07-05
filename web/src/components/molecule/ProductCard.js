import React from "react"
import tw from "twin.macro"
import { GatsbyImage } from "gatsby-plugin-image"
import { Link } from "gatsby"
import { motion } from "framer-motion"

const ProductCard = ({ product }) => {
  const { images, name } = product
  const imageData = images[0].asset.gatsbyImageData
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      tw="sm:( w-[500px] h-[200px] ) w-[80%] px-4 grid grid-cols-3  shadow-lg "
    >
      <CardLeft>
        <ProductName>{name}</ProductName>
        <Link to={`/product/${product.slug.current}`}>
          <Button>Shop Now</Button>
        </Link>
      </CardLeft>

      <CardRight>
        <GatsbyImage image={imageData} alt="product image" />
      </CardRight>
    </motion.div>
  )
}

export default ProductCard

const Button = tw.button`sm:(w-[8rem] h-[2.35rem] text-[1rem]) w-[4rem] h-[1.15rem] text-[0.5rem] bg-black text-white font-semibold mb-4`

const ProductName = tw.p`sm:(text-lg) m-0 text-sm font-bold`

const CardLeft = tw.div`justify-center flex flex-col  gap-2`

const CardRight = tw.div`col-span-2`
