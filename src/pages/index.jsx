import React from 'react'

import Layout from '../layouts/index'
import Image from '../components/Image'

const IndexPage = () => (
  <Layout>
    <div
      style={{
        maxWidth: '900px',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '10%',
        textAlign: 'center',
      }}
    >
      <h1>Index Page</h1>
      <p>Start coding!</p>
      <div
        style={{
          maxWidth: '300px',
          marginBottom: '1.45rem',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        <Image />
      </div>
    </div>
  </Layout>
)

export default IndexPage
