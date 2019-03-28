import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'

// Utilities
import kebabCase from 'lodash/kebabCase'

import Layout from '../layouts/index'
import SEO from '../components/Seo/Seo'

const CategoriesPage = ({
  data: {
    allMdx: { group },
    site: {
      siteMetadata: { title },
    },
  },
}) => (
  <Layout>
    <SEO title={title} />
    <div>
      <h1>Categories</h1>
      <ul>
        {group.map(cat => (
          <li key={cat.fieldValue}>
            <Link to={`/categories/${kebabCase(cat.fieldValue)}/`}>
              {cat.fieldValue} ({cat.totalCount})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </Layout>
)

CategoriesPage.propTypes = {
  data: PropTypes.shape({
    allMdx: PropTypes.shape({
      group: PropTypes.arrayOf(
        PropTypes.shape({
          fieldValue: PropTypes.string.isRequired,
          totalCount: PropTypes.number.isRequired,
        }).isRequired
      ),
    }),
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }),
    }),
  }),
}

export default CategoriesPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(limit: 2000) {
      group(field: fields___categories) {
        fieldValue
        totalCount
      }
    }
  }
`
