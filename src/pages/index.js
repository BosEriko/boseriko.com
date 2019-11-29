import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <div className="container mx-auto px-5">
      <div className="text-center font-bebas">
        <h2 className="text-6xl">Hello! My name is Bos Eriko</h2>
        <h3 className="text-gray-500 text-3xl">UI/UX Designer — Fullstack Website Developer using Javascript and Ruby</h3>
      </div>
    </div>
  </Layout>
)

export default IndexPage
