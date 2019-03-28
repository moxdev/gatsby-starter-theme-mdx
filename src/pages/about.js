import React from 'react'
import { Link } from 'gatsby'

import Layout from '../layouts/index'
import SEO from '../components/Seo/Seo'

const AboutPage = () => (
  <Layout>
    <SEO title="About Me" />
    <h1>About Page</h1>
    <p>Welcome to the About Page</p>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default AboutPage
