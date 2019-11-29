import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle }) => (
  <header className="bg-white">
    <div className="container mx-auto flex px-5">
      <h1 className="font-bebas m-0 p-0 text-5xl">BE</h1>
      <ul className="flex ml-auto items-center text-2xl">
        <li className="mr-5">
          <a href="http://github.boseriko.com/" className="color-gray-800 hover:opacity-50 smooth" data-tip="GitHub" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-github"></i>
          </a>
        </li>
        <li className="mr-5">
          <a href="http://twitter.boseriko.com/" className="hover:opacity-50 smooth" style={{ color: "#1ba1f2" }} data-tip="Twitter" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter"></i>
          </a>
        </li>
        <li className="mr-5">
          <a href="https://dev.to/boseriko" className="color-black hover:opacity-50 smooth" data-tip="DEV Community" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-dev"></i>
          </a>
        </li>
        <li className="mr-5">
          <a href="http://stream.boseriko.com/" className="hover:opacity-50 smooth" style={{ color: "#9147ff" }} data-tip="Twitch" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitch"></i>
          </a>
        </li>
        <li>
          <a href="http://resume.boseriko.com/" className="text-teal-500 hover:opacity-50 smooth" data-tip="Resume" target="_blank" rel="noopener noreferrer">
            <i className="fas fa-file-alt"></i>
          </a>
        </li>
      </ul>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
