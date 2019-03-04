import React from 'react'
import { Link } from 'gatsby'
import Layout from '../layouts/index'

const NotFoundPage = () => (
  <Layout>
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
