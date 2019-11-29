import PropTypes from "prop-types"
import React from "react"

const Footer = ({ siteTitle }) => (
  <footer className="bg-white text-center p-5">
    Made with <span className="text-red-400"><i className="fas fa-heart"></i></span> by {siteTitle} &copy; {new Date().getFullYear()}
  </footer>
)

Footer.propTypes = {
  siteTitle: PropTypes.string,
}

Footer.defaultProps = {
  siteTitle: ``,
}

export default Footer
