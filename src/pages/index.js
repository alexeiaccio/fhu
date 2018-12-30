import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import { propPathOr } from '../utils'
import Layout from '../components/layout'
import Slider from '../components/blocks/main-slider'

function IndexPage({ data, location }) {
  const items = propPathOr(null, ['homepage', 'edges', 0, 'node', 'items'])
  return (
    <Layout location={location}>
      <Slider items={items(data)} />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    homepage: PropTypes.object.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
}

export default IndexPage

export const PageQuery = graphql`
  query IndexQuery {
    homepage: allPrismicHomepageBodySlider(
      filter: { primary: { sliderid: { eq: "images" } } }
    ) {
      edges {
        node {
          items {
            image {
              localFile {
                childImageSharp {
                  fluid(maxWidth: 1600, jpegProgressive: true) {
                    ...GatsbyImageSharpFluid_noBase64
                  }
                }
              }
            }
            caption {
              html
            }
            link {
              document {
                uid
                data {
                  title {
                    text
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
