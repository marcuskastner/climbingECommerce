import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import tw from "twin.macro"
import { wrap } from "popmotion"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faCircleArrowLeft,
  faCircleArrowRight,
} from "@fortawesome/free-solid-svg-icons"
import { imageUrlFor } from "../../lib/image-url"

const variants = {
  enter: direction => {
    return {
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: direction => {
    return {
      zIndex: 0,
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    }
  },
}

const Pagination = ({ images }) => {
  const [[page, direction], setPage] = useState([0, 0])
  const imageIndex = wrap(0, images.length, page)

  const paginate = newDirection => {
    setPage([page + newDirection, newDirection])
  }

  return (
    <div className="wrapper" tw="flex flex-col ">
      <div
        className="pagination_container"
        tw="flex justify-center items-center gap-10 "
      >
        <FontAwesomeIcon
          className="fa-2x"
          icon={faCircleArrowLeft}
          onClick={() => paginate(-1)}
        />

        <div
          className="image_container"
          tw="w-[400px] h-[400px] flex justify-center items-center overflow-hidden"
        >
          <AnimatePresence initial={false} custom={direction} exitBeforeEnter>
            <motion.img
              key={images[imageIndex].asset.id}
              src={imageUrlFor(images[imageIndex].asset.id)}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
          </AnimatePresence>
        </div>
        <FontAwesomeIcon
          className="fa-2x"
          icon={faCircleArrowRight}
          onClick={() => paginate(1)}
        />
      </div>
      <div
        className="lower_pagination_container"
        tw="flex justify-center items-center  gap-4"
      >
        {images.map((image, i) => (
          <div
            key={i}
            className="image_container"
            tw="w-[75px] h-[75px] flex justify-center items-center"
            style={
              imageIndex === i
                ? {
                    border: "2px solid red",
                  }
                : {
                    border: "2px solid white",
                  }
            }
          >
            <img
              onClick={() => setPage([i, 1])}
              src={imageUrlFor(image.asset.id)}
              alt="smaller image"
              key={image.asset.id}
              tw="max-h-full max-w-full"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Pagination
