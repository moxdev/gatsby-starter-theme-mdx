import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'

import Layout from '../layouts/index'
import SEO from '../components/Seo/Seo'

const CategoryPage = ({ pageContext, data }) => {
  const { category } = pageContext
  const { edges, totalCount } = data.allMdx
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? '' : 's'
  } tagged with "${category}"`

  return (
    <Layout>
      <SEO title={`Tag: ${category}`} />
      <h1>{tagHeader}</h1>
      <ul>
        {edges.map(({ node }) => {
          const { id, title, postUrl } = node.fields
          return (
            <li key={id}>
              <Link to={postUrl}>{title}</Link>
            </li>
          )
        })}
      </ul>

      <Link to="/tags">All tags</Link>
    </Layout>
  )
}

CategoryPage.propTypes = {
  pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
            }),
            fields: PropTypes.shape({
              slug: PropTypes.string.isRequired,
            }),
          }),
        }).isRequired
      ),
    }),
  }),
}

export const pageQuery = graphql`
  query($category: String) {
    allMdx(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fields: { categories: { in: [$category] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            id
            categories
            title
            postUrl
          }
        }
      }
    }
  }
`

export default CategoryPage
