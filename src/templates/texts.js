import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'
import { propPathOr } from 'crocks'

import Img from '../components/elements/img'
import RichContent from '../components/elements/rich-content'
import Tags from '../components/elements/tags'
import TextBody from '../components/blocks/text-body'

function TextsPage({ data }) {
  const texts = propPathOr(null, ['texts', 'data'], data)
  const tags = propPathOr(null, ['texts', 'tags'], data)
  const imgSrc = propPathOr(null, ['image'], texts)
  const title = propPathOr(null, ['title', 'html'], texts)
  const body = propPathOr(null, ['body'], texts)

  return (
    <>
      <RichContent
        css={css`
          & h1 {
            ${tw(['font-extrabold', 'mb-q24', 'text-5xl'])}
          }
        `}
        content={title}
      />
      <div
        css={css`
          ${tw(['absolute', 'm-q12', 'pin-r', 'pin-t', 'z-10'])}
        `}
      >
        <Tags tags={tags} />
      </div>
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
      tags
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
          ... on PrismicTextBodyPeople {
            items {
              link {
                document {
                  uid
                  data {
                    title {
                      text
                    }
                  }
                }
              }
            }
          }
          ... on PrismicTextBodyDescription {
            primary {
              text {
                html
              }
            }
          }
          ... on PrismicTextBodyText {
            primary {
              text {
                html
              }
            }
          }
          ... on PrismicTextBodyRighted {
            primary {
              text {
                html
              }
            }
          }
          ... on PrismicTextBodyCentered {
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
          ... on PrismicTextBodyVideo {
            primary {
              link {
                html
              }
            }
          }
          ... on PrismicTextBodyRelated {
            items {
              link {
                document {
                  uid
                  data {
                    title {
                      text
                    }
                    image {
                      url
                      localFile {
                        childImageSharp {
                          fluid(maxWidth: 600, jpegProgressive: true) {
                            ...GatsbyImageSharpFluid
                          }
                        }
                      }
                    }
                    description {
                      text
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
