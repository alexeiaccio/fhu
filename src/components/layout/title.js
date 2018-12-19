/* global tw */
/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { StaticQuery, Link, graphql } from 'gatsby'
import { Content } from '../elements/shared'
import { Box } from '../elements/boxs'

const query = graphql`
  {
    home: prismicHomepage {
      data {
        title {
          text
        }
      }
    }
  }
`

const ContentLink = Content.withComponent(Link)

function Title() {
  return (
    <StaticQuery
      query={query}
      render={({ home }) => (
        <ContentLink
          css={css`
            ${Box};
            ${tw(['no-underline', 'text-black', 'hover:text-black'])};
          `}
          to="/"
        >
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
