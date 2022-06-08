import React, { useState, useEffect } from "react"
import tw from "twin.macro"

function Title() {
  const [isDesktop, setDesktop] = useState(window.innerWidth > 650)

  const updateMedia = () => {
    setDesktop(window.innerWidth > 650)
  }

  useEffect(() => {
    window.addEventListener("resize", updateMedia)
    return () => window.removeEventListener("resize", updateMedia)
  })
  return (
    <div tw="absolute top-[40%] left-[50%] translate-x-[-50%]">
      {isDesktop ? (
        <div tw="flex flex-col justify-center items-center">
          <p tw="mb-3 text-[2rem] text-white">Adventure Awaits</p>

          <Button>SHOP NOW</Button>
        </div>
      ) : (
        <p tw="mb-3 text-[5vw] text-white">CLIMBFREE</p>
      )}
    </div>
  )
}

export default Title

const Button = tw.button`w-[8rem] h-[2.35rem] bg-white text-black font-semibold text-[1rem]`
