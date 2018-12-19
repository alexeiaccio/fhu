import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { compose, equals, filter, propPathOr } from 'crocks'

import Slider from '../components/blocks/slider'

function IndexPage({ data }) {
  const body = propPathOr(null, ['homepage', 'data', 'body'])
  const isSliders = filter(item =>
    equals('PrismicHomepageBodySlider', propPathOr(false, ['__typename'], item))
  )
  const isImages = filter(item =>
    equals('images', propPathOr(false, ['primary', 'sliderid'], item))
  )
  const getItems = propPathOr(null, [0, 'items'])
  const items = compose(
    getItems,
    isImages,
    isSliders,
    body
  )(data)
  return <Slider items={items} />
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    homepage: PropTypes.object.isRequired,
  }).isRequired,
}

export default IndexPage

export const PageQuery = graphql`
  query IndexQuery {
    homepage: prismicHomepage {
      data {
        body {
          __typename
          ... on PrismicHomepageBodySlider {
            primary {
              sliderid
            }
            items {
              image {
                url
              }
              link {
                uid
              }
            }
          }
        }
      }
    }
  }
`
