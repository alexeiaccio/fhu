/* global tw */
import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import { css } from '@emotion/core'

function TextsPage({ data }) {
  return (
    <Fragment>
      <div
        css={css`
          ${tw(['text-red'])}
        `}
        dangerouslySetInnerHTML={{ __html: data.texts.data.title.html }} // eslint-disable-line react/no-danger
      />
      {data.texts.data.image && (
        <Img fluid={data.texts.data.image.localFile.childImageSharp.fluid} />
      )}
    </Fragment>
  )
}

TextsPage.propTypes = {
  data: PropTypes.shape({
    homepage: PropTypes.object.isRequired,
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
          localFile {
            childImageSharp {
              fluid(maxWidth: 1200, jpegProgressive: true) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          fb {
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
