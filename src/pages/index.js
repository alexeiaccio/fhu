import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import { propPathOr } from '../utils'
import Layout from '../components/layout'
import Seo from '../components/seo'
import Slider from '../components/blocks/main-slider'

function IndexPage({ data, location }) {
  const pageData = propPathOr(null, ['seo', 'data'], data)
  const pageTitle = propPathOr(null, ['title', 'text'], pageData)
  const pageDescription = propPathOr(null, ['description', 'text'], pageData)
  const pageKeywords = propPathOr(null, ['seokeywords'], pageData)
  const pageImage = propPathOr(
    null,
    ['image', 'fb', 'localFile', 'childImageSharp', 'fixed', 'src'],
    pageData
  )
  const pathname = propPathOr('/', ['location', 'pathname'], location)
  const items = propPathOr(null, ['slider', 'edges', 0, 'node', 'items'])
  return (
    <Layout>
      <Seo
        pageTitle={pageTitle}
        pageDescription={pageDescription}
        pageKeywords={pageKeywords}
        pageImage={pageImage}
        pathname={pathname}
      />
      <Slider items={items(data)} />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    seo: PropTypes.object.isRequired,
    slider: PropTypes.object.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
}

export default IndexPage

export const PageQuery = graphql`
  query IndexQuery {
    seo: prismicHomepage {
      data {
        title {
          text
        }
        description {
          text
        }
        seokeywords
        image {
          fb {
            url
            localFile {
              childImageSharp {
                fixed(width: 1200, height: 628) {
                  src
                }
              }
            }
          }
        }
      }
    }
    slider: allPrismicHomepageBodySlider(
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
                ... on PrismicText {
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
  }
`
