import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle }) => (
  <header className="bg-white">
    <div className="container mx-auto flex">
      <h1 className="font-bebas m-0 p-0 text-5xl">BE</h1>
      <ul className="flex ml-auto items-center text-2xl">
        <li className="mr-5">
          <a href="#Link" className="hover:opacity-50 smooth" style={{ color: "#1ba1f2" }}>
            <i className="fab fa-twitter"></i>
          </a>
        </li>
        <li className="mr-5">
          <a href="#Link" className="color-black hover:opacity-50 smooth">
            <i className="fab fa-dev"></i>
          </a>
        </li>
        <li>
          <a href="#Link" className=" hover:opacity-50 smooth" style={{ color: "#9147ff" }}>
            <i className="fab fa-twitch"></i>
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
