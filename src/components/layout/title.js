import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'

import AnimatedTitle from '../elements/animated-title'

const query = graphql`
  {
    home: prismicHomepage {
      data {
        title {
          text
        }
      }
    }
    slider: allPrismicHomepageBodySlider(
      filter: { primary: { sliderid: { eq: "titles" } } }
    ) {
      edges {
        node {
          items {
            caption {
              text
            }
          }
        }
      }
    }
  }
`

function Title({ location }) {
  return (
    <StaticQuery
      query={query}
      render={({ home, slider }) => (
        <AnimatedTitle home={home} location={location} slider={slider} />
      )}
    />
  )
}

Title.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
}

export default Title
