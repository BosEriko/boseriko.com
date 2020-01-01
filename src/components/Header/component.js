import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle }) => (
  <header className="bg-white">
    <div className="container mx-auto flex px-5">
      <h1 className="font-bebas m-0 p-0 text-5xl">BE</h1>
      <ul className="flex ml-auto items-center text-2xl">
        <li className="mr-8">
          <a href="http://github.boseriko.com/" className="hover:opacity-50 smooth" data-tip="GitHub" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-github"></i>
          </a>
        </li>
        <li className="mr-8">
          <a href="http://twitter.boseriko.com/" className="hover:opacity-50 smooth" data-tip="Twitter" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter"></i>
          </a>
        </li>
        <li className="mr-8">
          <a href="https://dev.to/boseriko" className="hover:opacity-50 smooth" data-tip="DEV Community" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-dev"></i>
          </a>
        </li>
        <li className="mr-8">
          <a href="http://youtube.boseriko.com/" className="hover:opacity-50 smooth" data-tip="YouTube" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-youtube"></i>
          </a>
        </li>
        <li className="mr-8">
          <a href="http://stream.boseriko.com/" className="hover:opacity-50 smooth" data-tip="Twitch" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitch"></i>
          </a>
        </li>
        <li>
          <a href="http://resume.boseriko.com/" className="hover:opacity-50 smooth" data-tip="Resume" target="_blank" rel="noopener noreferrer">
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
