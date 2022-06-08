import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import tw from "twin.macro"
import { wrap } from "popmotion"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faCircleArrowLeft,
  faCircleArrowRight,
} from "@fortawesome/free-solid-svg-icons"
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
          icon={faCircleArrowLeft}
          tw="w-[4rem]"
          onClick={() => paginate(-1)}
        />

        <div className="image_container" tw="overflow-hidden ">
          <AnimatePresence initial={false} custom={direction} exitBeforeEnter>
            <motion.img
              key={images[imageIndex].asset.id}
              src={images[imageIndex].asset.url}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
            />
          </AnimatePresence>
        </div>
        <FontAwesomeIcon
          icon={faCircleArrowRight}
          onClick={() => paginate(1)}
        />
      </div>
      <div
        className="lower_pagination_container"
        tw="flex justify-center items-center  gap-4"
      >
        {images.map((image, i) => (
          <img
            onClick={() => setPage([i, 1])}
            src={image.asset.url}
            alt="smaller image"
            key={image.asset.id}
            style={
              imageIndex === i
                ? { border: "2px solid red", width: 75 }
                : { border: "2px solid white", width: 75 }
            }
          />
        ))}
      </div>
    </div>
  )
}

export default Pagination

const Next = tw.div`bg-white rounded-full w-[10%] h-[10%] flex justify-center items-center border-2 border-indigo-700 border-solid text-[10px] `
