/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import Helmet from "react-helmet"

function Seo({ site }) {
  if (typeof site === "undefined") site = { title: "Free Climb" }
  const { title } = site

  return <Helmet title={title} />
}

export default Seo
