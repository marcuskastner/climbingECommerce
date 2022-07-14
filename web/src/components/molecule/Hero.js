import React, { useState, useEffect } from "react"
import tw from "twin.macro"
import Logo from "../../images/logo.png"
import { Link } from "gatsby"
function Hero() {
  const [isDesktop, setDesktop] = useState(true)

  useEffect(() => {
    if (typeof window !== "undefined") {
      setDesktop(window.innerWidth > 650)
    }
  }, [])

  const updateMedia = () => {
    if (typeof window !== "undefined") {
      setDesktop(window.innerWidth > 650)
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", updateMedia)
      return () => window.removeEventListener("resize", updateMedia)
    }
  })
  return (
    <Wrapper>
      {isDesktop ? (
        <>
          <p tw="mb-3 text-[2rem] text-white">Adventure Awaits</p>
          <Button>
            <Link to={`/shop`}>SHOP NOW</Link>
          </Button>
        </>
      ) : (
        <img src={Logo} tw="w-40 rounded-full -translate-y-1/2" />
      )}
    </Wrapper>
  )
}

export default Hero

const Button = tw.button`w-[8rem] h-[2.35rem] bg-white text-black font-semibold text-[1rem]`
const Wrapper = tw.div`absolute top-[40%] left-[50%] translate-x-[-50%] flex flex-col items-center`
