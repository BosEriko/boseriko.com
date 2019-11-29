import PropTypes from "prop-types"
import React from "react"

const Footer = ({ siteTitle }) => (
  <footer className="bg-white text-center py-5">
    {siteTitle} &copy; {new Date().getFullYear()}
  </footer>
)

Footer.propTypes = {
  siteTitle: PropTypes.string,
}

Footer.defaultProps = {
  siteTitle: ``,
}

export default Footer
