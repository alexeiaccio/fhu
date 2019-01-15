import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import { StaticQuery, Link, graphql } from 'gatsby'

import { propPathOr } from '../../utils'

function Title({ homepage }) {
  const title = propPathOr(null, ['data', 'title', 'text'], homepage)

  return (
    <Link to="/">
      <h1
        css={css`
          ${tw(['font-extrabold', 'pr-q96', 'text-3xl'])};
        `}
      >
        {title}
      </h1>
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
