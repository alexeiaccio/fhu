/* global tw */
import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'
import { propPathOr } from 'crocks'

import Img from '../components/elements/img'
import RichContent from '../components/elements/rich-content'
import TextBody from '../components/blocks/text-body'

function TextsPage({ data }) {
  const texts = propPathOr(null, ['texts', 'data'], data)
  const imgSrc = propPathOr(null, ['image'], texts)
  const title = propPathOr(null, ['title', 'html'], texts)
  const body = propPathOr(null, ['body'], texts)

  return (
    <>
      <RichContent
        css={css`
          ${tw(['mb-q24', 'text-xl'])}
        `}
        content={title}
      />
      <Img src={imgSrc} />
      <TextBody body={body} />
    </>
  )
}

TextsPage.propTypes = {
  data: PropTypes.shape({
    texts: PropTypes.object.isRequired,
  }).isRequired,
}

export default TextsPage

export const PageQuery = graphql`
  query TextsQuery($uid: String!) {
    texts: prismicText(uid: { eq: $uid }) {
      data {
        title {
          html
          text
        }
        image {
          url
          localFile {
            childImageSharp {
              fluid(maxWidth: 1200, jpegProgressive: true) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          fb {
            url
            localFile {
              childImageSharp {
                fixed(width: 1200, height: 628) {
                  src
                }
              }
            }
          }
        }
        body {
          __typename
          ... on PrismicTextBodyText {
            primary {
              text {
                html
              }
            }
          }
          ... on PrismicTextBodyImage {
            items {
              imagesrc {
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
          }
          ... on PrismicTextBodyMedia {
            items {
              link {
                link_type
                name
                url
                size
              }
            }
          }
        }
      }
    }
  }
`
