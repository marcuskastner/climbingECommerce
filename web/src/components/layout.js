import React from "react"
import { GlobalStyles } from "twin.macro"
import NavBar from "./molecule/NavBar"

const Layout = ({ children }) => {
  return (
    <div tw="max-w-screen-xl p-0 m-0">
      <GlobalStyles />
      <NavBar />
      <main>{children}</main>
      <footer></footer>
    </div>
  )
}

export default Layout
