/* global tw */
/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import styled from '@emotion/styled'
import { StaticQuery, Link, graphql } from 'gatsby'

import { Box } from '../elements/boxes'

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

const ContentLink = styled(Link)`
  ${Box};
  ${tw(['flex-1', 'p-q24'])};
  box-sizing: border-box;
  outline: 4px solid ${({ theme }) => theme.color};
`

function Title() {
  return (
    <StaticQuery
      query={query}
      render={({ home }) => (
        <ContentLink to="/">
          <h1
            css={css`
              ${tw(['font-extrabold', 'text-3xl', 'w-full'])};
            `}
          >
            {home.data.title.text}
          </h1>
        </ContentLink>
      )}
    />
  )
}

export default Title
