import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../layouts/index'
import SEO from '../components/Seo/Seo'

const BlogPage = ({ data }) => {
  const siteTitle = data.site.siteMetadata.title
  const { edges: posts } = data.allMdx

  return (
    <Layout location={data.location} title={siteTitle}>
      <SEO
        title="All posts"
        keywords={[`blog`, `gatsby`, `javascript`, `react`]}
      />

      {posts.map(({ node }) => {
        const { title } = node.fields
        return (
          <div key={node.id}>
            <h3
              style={{
                marginBottom: `1rem`,
              }}
            >
              <Link style={{ boxShadow: `none` }} to={node.fields.postUrl}>
                {title}
              </Link>
            </h3>
            <small>{node.fields.date}</small>
            <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
          </div>
        )
      })}
      <Link to="/tags">Tags</Link>
      <Link to="/categories">Categories</Link>
    </Layout>
  )
}

export const pageQuery = graphql`
  query blogPage {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            title
            date(formatString: "MMMM DD, YYYY")
            postUrl
          }
        }
      }
    }
  }
`
export default BlogPage
