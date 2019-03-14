import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../layouts/index'
import PostLink from '../components/PostLink'
import SEO from '../components/Seo'

const BlogPage = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => {
  const Posts = edges
    .filter(edge => !!edge.node.frontmatter.date) // You can filter your posts based on some criteria
    .map(edge => <PostLink key={edge.node.id} post={edge.node} />)

  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <div
        style={{
          maxWidth: '900px',
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: '10%',
          textAlign: 'center',
        }}
      >
        <h1>Blog Page</h1>
        <div>{Posts}</div>
      </div>
    </Layout>
  )
}

export default BlogPage

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            path
            title
          }
        }
      }
    }
  }
`
