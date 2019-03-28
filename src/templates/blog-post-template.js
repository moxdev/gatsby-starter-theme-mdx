import React from 'react'
import { Link, graphql } from 'gatsby'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'

import Layout from '../layouts/index'
import SEO from '../components/Seo/Seo'

const BlogPostTemplate = ({ data, pageContext }) => {
  const siteTitle = data.site.siteMetadata.title
  const post = data.mdx
  const { author } = data.site.siteMetadata
  const { previous, next } = pageContext

  return (
    <Layout location={data.location} title={siteTitle}>
      <SEO title={post.fields.title} description={post.excerpt} />
      <h1>{post.fields.title}</h1>
      <p
        style={{
          display: `block`,
          marginBottom: `1rem`,
          marginTop: `1rem`,
        }}
      >
        {post.fields.date}
      </p>
      <p
        style={{
          display: `block`,
          marginBottom: `1rem`,
          marginTop: `1rem`,
        }}
      >
        {author}
      </p>
      <p
        style={{
          display: `block`,
          marginBottom: `1rem`,
          marginTop: `1rem`,
        }}
      >
        {post.fields.tags}
      </p>
      <MDXRenderer>{post.code.body}</MDXRenderer>
      <hr
        style={{
          marginBottom: `1rem`,
        }}
      />

      <ul
        style={{
          display: `flex`,
          flexWrap: `wrap`,
          justifyContent: `space-between`,
          listStyle: `none`,
          padding: 0,
        }}
      >
        <li>
          {previous && (
            <Link to={previous.fields.postUrl} rel="prev">
              ← {previous.fields.title}
            </Link>
          )}
        </li>
        <li>
          {next && (
            <Link to={next.fields.postUrl} rel="next">
              {next.fields.title} →
            </Link>
          )}
        </li>
      </ul>
    </Layout>
  )
}

export const pageQuery = graphql`
  query blogPostQuery($id: String) {
    site {
      siteMetadata {
        title
        author
      }
    }
    mdx(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      fields {
        title
        date(formatString: "MMMM DD, YYYY")
        tags
        postUrl
      }
      code {
        body
      }
    }
  }
`
export default BlogPostTemplate
