import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { propPathOr } from 'crocks'

import Slider from '../components/blocks/main-slider'

function IndexPage({ data }) {
  const items = propPathOr(null, ['homepage', 'edges', 0, 'node', 'items'])
  return <Slider items={items(data)} />
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    homepage: PropTypes.object.isRequired,
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
                  fluid(maxWidth: 1200, jpegProgressive: true) {
                    ...GatsbyImageSharpFluid
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
