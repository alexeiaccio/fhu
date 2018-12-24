/* global tw */
import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import styled from '@emotion/styled'

import AnimatedTitle from '../elements/animated-title'
import { Box } from '../elements/boxes'
import Search from '../elements/search'

const query = graphql`
  {
    home: prismicHomepage {
      data {
        title {
          text
        }
      }
    }
    search: siteSearchIndex {
      index
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

const Container = styled.div`
  ${Box};
  ${tw(['flex-no-grow', 'p-q12', 'relative', 'md:p-q24'])};
  box-sizing: border-box;
  outline: 4px solid ${({ theme }) => theme.color};
`

function Title({ location }) {
  return (
    <StaticQuery
      query={query}
      render={({ home, search, slider }) => (
        <Container>
          <AnimatedTitle home={home} location={location} slider={slider} />
          <Search location={location} search={search} />
        </Container>
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
