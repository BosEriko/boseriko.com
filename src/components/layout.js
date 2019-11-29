import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import ReactTooltip from 'react-tooltip'

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
    <div class="flex flex-col min-h-screen bg-gray-100 text-gray-700">
      <ReactTooltip />
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
