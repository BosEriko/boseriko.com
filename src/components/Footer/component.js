import PropTypes from "prop-types"
import React from "react"

const Footer = ({ siteTitle }) => (
  <footer className="bg-white text-center p-5">
    Made with <i className="fas fa-heartbeat"></i> by {siteTitle} using <a href="https://www.gatsbyjs.org/" target="_blank" rel="noopener noreferrer" className="hover:no-underline underline">GatsbyJS</a> <i className="far fa-copyright"></i> {new Date().getFullYear()}
  </footer>
)

Footer.propTypes = {
  siteTitle: PropTypes.string,
}

Footer.defaultProps = {
  siteTitle: ``,
}

export default Footer
