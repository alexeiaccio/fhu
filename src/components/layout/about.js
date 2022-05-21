import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { graphql, Link, StaticQuery } from 'gatsby'
import PropTypes from 'prop-types'
import React, { memo } from 'react'
import { map, propPathOr } from '../../utils'
import Img from '../elements/img'
import Content from './content'
import { outlinedStyles } from './outlined'

const titleStyles = css`
  ${tw(['block', 'font-extrabold', 'mb-q16'])};
`

const descStyles = css`
  ${tw(['mt-q16', 'text-sm'])};
`

const hovered = ({ theme }) => css`
  transition: background-color 200ms ease-in-out;
  &:hover {
    background-color: ${theme.color};
  }
`

const StyledLink = styled(Link)`
  ${tw(['inline-block', 'mt-q24', 'px-q12', 'py-q8'])};
  ${outlinedStyles};
  ${hovered};
`

const logoStyles = css`
  ${tw(['flex', 'flex-row', 'flex-no-wrap', 'items-center', 'mt-q24'])};
  & .logo {
    ${tw(['w-1/2'])};
  }
`

function About({ about }) {
  const image = propPathOr(null, ['data', 'image'], about)
  const title = propPathOr('About', ['data', 'title', 'text'], about)
  const body = propPathOr([], ['data', 'body'], about)
  const logos = map(propPathOr(null, ['items']), body)
  const description = propPathOr('', ['data', 'description', 'text'], about)

  return (
    <Content>
      <h3 css={titleStyles}>{title}</h3>
      <Img src={image} />
      <div css={descStyles}>{description}</div>
      <StyledLink to="/about">More →</StyledLink>
      <div css={logoStyles}>
        {logos
          .filter(x => x && x)[0]
          .map(src =>
            src ? (
              <Img className="logo" key={src.imagesrc.url} src={src.imagesrc} />
            ) : null
          )}
      </div>
    </Content>
  )
}

About.propTypes = {
  about: PropTypes.objectOf(PropTypes.object).isRequired,
}

const withStaticQuery = props => (
  <StaticQuery
    query={graphql`
      {
        about: prismicAbout {
          data {
            title {
              text
            }
            image {
              url
              fluid(maxWidth: 600) {
                ...GatsbyPrismicImageFluid_noBase64
              }
            }
            description {
              text
            }
            body {
              __typename
              ... on PrismicAboutBodyImage {
                items {
                  imagesrc {
                    url
                    fluid(maxWidth: 600) {
                      ...GatsbyPrismicImageFluid_noBase64
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={({ about }) => <About about={about} {...props} />}
  />
)

export default memo(withStaticQuery)
