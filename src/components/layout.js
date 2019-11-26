import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./Header/component"
import Footer from "./Footer/component"
import "./Icons/css/all.min.css"
import "./layout.css"
import "./tailwind.css"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <div class="flex flex-col min-h-screen">
      <Header siteTitle={data.site.siteMetadata.title} />
      <main class="my-auto">{children}</main>
      <Footer siteTitle={data.site.siteMetadata.title} />
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
