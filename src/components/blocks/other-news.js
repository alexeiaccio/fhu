import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Link, StaticQuery, graphql } from 'gatsby'
import { css } from '@emotion/core'
import styled from '@emotion/styled'

import { propPathOr, uuid } from '../../utils'
import Img from '../elements/img'
import { outlinedStyles } from '../layout/outlined'

const wrapperStyles = css`
  ${tw(['flex', 'flex-row', 'flex-wrap'])};
  margin: 0.75rem -1rem 0;
`

const liStyles = css`
  ${tw(['flex', 'flex-1', 'max-w-1/2', 'px-q8', 'py-1'])};
  box-sizing: border-box;
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

const hovered = ({ theme }) => css`
  transition: background-color 200ms ease-in-out;
  &:hover {
    background-color: ${theme.color};
  }
`

const StyledLink = styled(Link)`
  ${tw([
    'block',
    'mx-auto',
    'my-q24',
    'px-q12',
    'py-q8',
    'text-center',
    'w-100',
    'md:w-1/2',
  ])};
  ${outlinedStyles};
  ${hovered};
`

function OtherNews({ pathname, news, all }) {
  const filteredNews = news.edges.filter(
    ({ node }) => node.uid !== pathname.replace(/^\//, '')
  )

  return (
    <>
      <div css={wrapperStyles}>
        {filteredNews.slice(0, !all ? 8 : undefined).map(({ node }) => {
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
      {!all && filteredNews.length > 6 && (
        <StyledLink to="/archive">More →</StyledLink>
      )}
    </>
  )
}

OtherNews.propTypes = {
  pathname: PropTypes.string.isRequired,
  news: PropTypes.shape({
    edges: PropTypes.array.isRequired,
  }).isRequired,
  all: PropTypes.bool,
}

OtherNews.defaultProps = {
  all: false,
}

function WithStaticQuery(props) {
  return (
    <StaticQuery
      query={graphql`
        query OtherNewsQuery {
          news: allPrismicText(
            filter: { tags: { regex: "/news/i" } }
            sort: { fields: [data___date], order: DESC }
            limit: 7
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
      /* eslint-disable-next-line react/prop-types */
      render={({ news }) => <OtherNews news={props.news || news} {...props} />}
    />
  )
}

export default memo(WithStaticQuery)
