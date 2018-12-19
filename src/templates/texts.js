/* global tw */
import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'
import { propPathOr } from 'crocks'

import Img from '../components/elements/img'

function TextsPage({ data }) {
  const imgSrc = propPathOr(null, ['texts', 'data', 'image'], data)
  return (
    <Fragment>
      <Img src={imgSrc} />
      <div
        css={css`
          ${tw(['text-xl'])}
        `}
        dangerouslySetInnerHTML={{ __html: data.texts.data.title.html }} // eslint-disable-line react/no-danger
      />
    </Fragment>
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
        }
      }
    }
  }
`
