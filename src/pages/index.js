import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'
import styled from '@emotion/styled'

import { Content } from '../components/elements/shared'

const H1 = styled.div`
  color: red;
`

function IndexPage({ data }) {
  return (
    <Content>
      <H1
        css={css`
          color: green;
        `}
        dangerouslySetInnerHTML={{ __html: data.homepage.data.title.html }}
      />
    </Content>
  )
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
        title {
          html
          text
        }
        body {
          __typename
          ... on PrismicHomepageBodySlider {
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
