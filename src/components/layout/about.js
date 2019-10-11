import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import { StaticQuery, Link, graphql } from 'gatsby'
import styled from '@emotion/styled'

import { map, propPathOr, uuid } from '../../utils'
import { outlinedStyles } from './outlined'
import Content from './content'
import Img from '../elements/img'

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
  const image = propPathOr(null, ['data', 'image', 'full'], about)
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
              <Img className="logo" key={uuid()} src={src.imagesrc} />
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
              full {
                url
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 600, jpegProgressive: true) {
                      ...GatsbyImageSharpFluid_noBase64
                    }
                  }
                }
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
                    localFile {
                      childImageSharp {
                        fluid(maxWidth: 600, jpegProgressive: true) {
                          ...GatsbyImageSharpFluid_noBase64
                        }
                      }
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
