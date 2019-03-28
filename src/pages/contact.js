import React from 'react'
import { Link } from 'gatsby'

import Layout from '../layouts/index'
import SEO from '../components/Seo/Seo'

const ContactPage = () => (
  <Layout>
    <SEO title="Contact Me" />
    <h1>Contact Page</h1>
    <p>Welcome to the Contact Page</p>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default ContactPage
