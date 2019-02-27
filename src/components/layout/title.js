import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { StaticQuery, Link, graphql } from 'gatsby'

import { propPathOr } from '../../utils'

const bgStyles = ({ theme }) => `
  background-color: ${theme.color};
`

const H1 = styled.h1`
  ${tw(['font-extrabold', 'inline-block', 'mr-q96', 'relative', 'text-3xl'])};
  &::after {
    ${tw([
      'absolute',
      'font-semibold',
      'p-q4',
      'rounded-sm',
      'text-white',
      'text-xs',
    ])};
    ${bgStyles};
    content: 'beta';
    right: 0px;
    top: 0px;
    transform: translateX(112%);
  }
`

function Title({ homepage }) {
  const title = propPathOr(null, ['data', 'title', 'text'], homepage)

  return (
    <Link to="/">
      <H1>{title}</H1>
    </Link>
  )
}

Title.propTypes = {
  homepage: PropTypes.objectOf(PropTypes.objectOf).isRequired,
}

const withStaticQuery = () => (
  <StaticQuery
    query={graphql`
      query {
        homepage: prismicHomepage {
          data {
            title {
              text
            }
          }
        }
      }
    `}
    render={({ homepage }) => <Title homepage={homepage} />}
  />
)

export default withStaticQuery
