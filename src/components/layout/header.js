import React from 'react'
import { css } from '@emotion/core'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'

import Title from './title'
import Content from './content'
import Outlined from './outlined'
import Search from './search'

const query = graphql`
  query {
    homepage: prismicHomepage {
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

const styles = css`
  ${tw(['flex-no-grow', 'flex-no-shrink', 'relative'])};
`

function Header({ location }) {
  return (
    <StaticQuery
      query={query}
      render={({ homepage, search, slider }) => (
        <Outlined css={styles}>
          <Content>
            <Title homepage={homepage} location={location} slider={slider} />
            <Search location={location} search={search} />
          </Content>
        </Outlined>
      )}
    />
  )
}

Header.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
}

export default Header
