/** @jsx jsx */
import { jsx } from '@emotion/core'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import styled from '@emotion/styled'

import AnimatedTitle from '../elements/animated-title'
import { Box } from '../elements/boxes'
import { Outlined } from '../elements/shared'
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
  ${Outlined};
  ${tw(['flex-no-grow', 'flex-no-shrink', 'p-q12', 'relative', 'md:p-q24'])};
  box-sizing: border-box;
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
