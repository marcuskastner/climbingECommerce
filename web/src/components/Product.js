import React from "react"
import tw from "twin.macro"
import { GatsbyImage } from "gatsby-plugin-image"
import { Link } from "gatsby"
import { motion } from "framer-motion"

const Product = ({ product }) => {
  const { images, name } = product
  const imageData = images[0].asset.gatsbyImageData
  return (
    <motion.div
      tw="sm:( w-[500px] h-[200px] ) w-[80%] px-4 grid grid-cols-3  shadow-lg "
      whileHover={{ scale: 1.05 }}
    >
      <div tw="justify-center flex flex-col  gap-2">
        <p tw="sm:(text-lg) m-0 text-sm font-bold">{name}</p>

        <Link to={`/product/${product.slug.current}`}>
          <Button>Shop Now</Button>
        </Link>
      </div>
      <div tw="col-span-2">
        <GatsbyImage image={imageData} alt="product image" />
      </div>
    </motion.div>
  )
}

const Button = tw.button`sm:(w-[8rem] h-[2.35rem] text-[1rem]) w-[4rem] h-[1.15rem] text-[0.5rem] bg-black text-white font-semibold `

export default Product
