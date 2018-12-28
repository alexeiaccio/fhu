import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'

import { equals, map, propPathOr, uuid } from '../utils'
import Img from '../components/elements/img'
import RichContent from '../components/elements/rich-content'
import { RichText } from '../components/elements/rich-text'

const headingStyles = css`
  ${tw(['font-extrabold', 'mb-q24', 'text-5xxl'])};
`

const sectionStyles = css`
  ${tw(['py-q24', 'max-w-md', 'w-full'])};
  margin: 0 auto;
`

const logoStyles = css`
  ${sectionStyles};
  ${tw(['flex', 'flex-row', 'flex-no-wrap', 'items-center'])};
  & .logo {
    ${tw(['w-1/2'])};
  }
`

const textStyles = css`
  ${RichText};
  ${tw(['mb-q24'])};
`

function AboutPage({ data }) {
  const about = propPathOr(null, ['about', 'data'], data)
  const title = propPathOr(null, ['title', 'text'], about)
  const imgSrc = propPathOr(null, ['image', 'full'], about)
  const body = propPathOr([], ['body'], about)

  return (
    <>
      <h1 css={headingStyles}>{title}</h1>
      <Img src={imgSrc} />
      <section css={sectionStyles}>
        {map(({ __typename, primary }) => {
          const textContent = propPathOr(null, ['text', 'html'], primary)

          return (
            <>
              {equals(__typename, 'PrismicAboutBodyText') && (
                <RichContent
                  content={textContent}
                  css={textStyles}
                  key={uuid()}
                />
              )}
            </>
          )
        }, body)}
      </section>
      <section css={logoStyles}>
        {map(
          ({ __typename, items }) => (
            <>
              {equals(__typename, 'PrismicAboutBodyImage') && (
                <>
                  {items.map(src =>
                    src ? (
                      <Img className="logo" key={uuid()} src={src.imagesrc} />
                    ) : null
                  )}
                </>
              )}
            </>
          ),
          body
        )}
      </section>
    </>
  )
}

AboutPage.propTypes = {
  data: PropTypes.shape({
    about: PropTypes.object.isRequired,
  }).isRequired,
}

export default AboutPage

export const PageQuery = graphql`
  query AboutQuery {
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
                fluid(maxWidth: 1200, jpegProgressive: true) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
        body {
          __typename
          ... on PrismicAboutBodyText {
            primary {
              text {
                html
              }
            }
          }
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
`
