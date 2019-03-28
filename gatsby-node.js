/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const _ = require('lodash')

const createBlogPosts = (createPage, posts) => {
  // Create Previous & Next for posts
  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    createPage({
      path: post.node.fields.postUrl,
      component: path.resolve('src/templates/blog-post-template.js'),
      context: {
        id: post.node.id,
        filePath: post.node.fields.filePath,
        previous,
        next,
      },
    })
  })
}

const createBlogTags = (createPage, posts) => {
  // Tag pages:
  let tags = []
  // Iterate through each post, putting all found tags into `tags`
  _.each(posts, edge => {
    if (_.get(edge, 'node.fields.tags')) {
      tags = tags.concat(edge.node.fields.tags)
    }
  })
  // Eliminate duplicate tags
  tags = _.uniq(tags)

  tags.forEach(tag => {
    createPage({
      path: `/tags/${_.kebabCase(tag)}/`,
      component: path.resolve('src/templates/tag-template.js'),
      context: {
        tag,
      },
    })
  })
}

const createBlogCategories = (createPage, posts) => {
  // Tag pages:
  let categories = []
  // Iterate through each post, putting all found tags into `tags`
  _.each(posts, edge => {
    if (_.get(edge, 'node.fields.categories')) {
      categories = categories.concat(edge.node.fields.categories)
    }
  })
  // Eliminate duplicate tags
  categories = _.uniq(categories)

  categories.forEach(category => {
    createPage({
      path: `/categories/${_.kebabCase(category)}/`,
      component: path.resolve('src/templates/category-template.js'),
      context: {
        category,
      },
    })
  })
}

exports.createPages = ({ actions, graphql }) => {
  // const { createPage } = actions
  // const blogPostTemplate =
  // const tagTemplate =
  // Query for markdown nodes to use in creating pages.
  // You can query for whatever data you want to create pages for e.g.
  // products, portfolio items, landing pages, etc.

  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          {
            allMdx(
              sort: { fields: [frontmatter___date], order: DESC }
              limit: 1000
            ) {
              edges {
                node {
                  id
                  fields {
                    id
                    filePath
                    postUrl
                    published
                    date
                    title
                    categories
                    tags
                    keywords
                    description
                  }
                  frontmatter {
                    slug
                  }
                  code {
                    scope
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        // Handle errors
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }
        // Handle no posts
        if (_.isEmpty(result.allMdx)) {
          reject('Sorry there are no posts!')
        }

        // Create blog posts pages, tags pages, category.
        const posts = result.data.allMdx.edges
        const { createPage } = actions

        createBlogPosts(createPage, posts)
        createBlogTags(createPage, posts)
        createBlogCategories(createPage, posts)
      })
    )
  })
}

// This generates a node field for each new post
// Could use for automaticlaly creating urls from a file path

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
    const pathToPost = createFilePath({ node, getNode, basePath: `blog-posts` })

    createNodeField({
      name: `id`,
      node,
      value: node.id,
    })

    createNodeField({
      name: `filePath`,
      node,
      value: pathToPost,
    })

    createNodeField({
      name: `postUrl`,
      node,
      value: `/blog${node.frontmatter.slug}`,
    })

    createNodeField({
      name: `published`,
      node,
      value: node.frontmatter.published,
    })

    createNodeField({
      name: `date`,
      node,
      value: node.frontmatter.date ? node.frontmatter.date.split(' ')[0] : '',
    })

    createNodeField({
      name: `title`,
      node,
      value: node.frontmatter.title || '',
    })

    createNodeField({
      name: `categories`,
      node,
      value: node.frontmatter.categories || [],
    })

    createNodeField({
      name: `tags`,
      node,
      value: node.frontmatter.tags || [],
    })

    createNodeField({
      name: `keywords`,
      node,
      value: node.frontmatter.keywords || [],
    })

    createNodeField({
      name: `description`,
      node,
      value: node.frontmatter.description || '',
    })
  }
}
