import React from 'react'
import { Link } from 'gatsby'
import SEO from '../components/Seo/Seo'
import Layout from '../layouts/index'

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <h1>Page Not Found</h1>
    <p>
      We are sorry but that page does not exist. Please use your back button or
      click{' '}
      <Link to="/" rel="noopener noreferrer">
        here
      </Link>{' '}
      to return to the home page.
    </p>
    <hr />
  </Layout>
)

export default NotFoundPage
