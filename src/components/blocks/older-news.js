import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Link, qraphql, StaticQuery } from 'gatsby'
import { css } from '@emotion/core'

import { propPathOr, uuid } from '../../utils'
import Img from '../elements/img'

const wrapperStyles = css`
  ${tw(['flex', 'flex-row', 'flex-wrap'])};
  margin: 0.75rem -1rem 0;
`

const liStyles = css`
  ${tw(['flex', 'flex-1', 'max-w-1/2', 'px-q8', 'py-1'])};
`

const linkStyles = css`
  ${tw(['w-full'])};
`

const cardStyles = css`
  ${tw(['p-q8'])};
  box-sizing: border-box;
`

const titleStyles = css`
  ${tw(['font-semibold', 'mt-q12', 'text-xxl'])};
`

const dateStyles = css`
  ${tw(['italic', 'my-q12', 'text-right', 'text-xs'])};
`

const descStyles = css`
  ${tw(['mt-q12', 'text-sm'])};
`

function OlderNews({ news }) {
  return (
    <div css={wrapperStyles}>
      {news.map(({ node }) => {
        const uid = propPathOr(null, ['uid'], node)
        const date = propPathOr(null, ['data', 'date'], node)
        const title = propPathOr(null, ['data', 'title', 'text'], node)
        const image = propPathOr(null, ['data', 'image', 'full'], node)
        const description = propPathOr(
          '',
          ['data', 'description', 'text'],
          node
        )

        return (
          <li css={liStyles} key={uuid()}>
            {uid && (
              <Link css={linkStyles} to={`/${uid}`}>
                <div css={cardStyles}>
                  <Img src={image} />
                  <h2 css={titleStyles}>{title}</h2>
                  <div css={dateStyles}>{date}</div>
                  <div css={descStyles}>{description}</div>
                </div>
              </Link>
            )}
          </li>
        )
      })}
    </div>
  )
}

OlderNews.propTypes = {
  news: PropTypes.objectOf(PropTypes.array).isRequired,
}

function WithStaticQuery() {
  return (
    <StaticQuery
      query={qraphql`
        query ArchiveQuery {
          news: allPrismicText(
            filter: { tags: { regex: "/news/i" } }
            sort: { fields: [data___date], order: DESC }
            limit: 8
            skip: 1
          ) {
            edges {
              node {
                uid
                data {
                  date(formatString: "MMMM DD, YYYY")
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
      render={({ news }) => <OlderNews news={news} />}
    />
  )
}

export default memo(WithStaticQuery)
