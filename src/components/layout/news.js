import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import { StaticQuery, Link, graphql } from 'gatsby'

import { propPathOr } from '../../utils'
import Outlined from './outlined'
import Img from '../elements/img'
import Content from './content'

const headingStyles = css`
  ${tw(['block', 'font-extrabold', 'mb-q12'])};
`

const titleStyles = css`
  ${tw(['block', 'font-bold', 'my-q12'])};
`

const dateStyles = css`
  ${tw(['italic', 'mt-q12', 'text-right', 'text-xs'])};
`

const descStyles = css`
  ${tw(['text-sm'])};
`

function News({ news }) {
  const newsNode = propPathOr(null, ['edges', 0, 'node'], news)
  const uid = propPathOr(null, ['uid'], newsNode)
  const date = propPathOr(null, ['data', 'date'], newsNode)
  const image = propPathOr(null, ['data', 'image', 'full'], newsNode)
  const title = propPathOr('News', ['data', 'title', 'text'], newsNode).slice(
    0,
    36
  )
  const description = propPathOr(
    '',
    ['data', 'description', 'text'],
    newsNode
  ).slice(0, 64)

  return (
    <Outlined>
      <Content>
        <Link css={headingStyles} to={uid}>
          Latest News
        </Link>
        <Img src={image} />
        <Link css={titleStyles} to={uid}>
          {title}
        </Link>
        <div css={descStyles}>{description}...</div>
        <div css={dateStyles}>{date}</div>
      </Content>
    </Outlined>
  )
}

News.propTypes = {
  news: PropTypes.objectOf(PropTypes.object).isRequired,
}

const withStaticQuery = memo(props => (
  <StaticQuery
    query={graphql`
      {
        news: allPrismicText(
          filter: { tags: { regex: "/news/i" } }
          sort: { fields: [data___date], order: DESC }
          limit: 1
        ) {
          edges {
            node {
              uid
              data {
                date(fromNow: true)
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
              }
            }
          }
        }
      }
    `}
    render={({ news }) => <News news={news} {...props} />}
  />
))

export default withStaticQuery
