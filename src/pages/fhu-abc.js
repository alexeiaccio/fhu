import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import { css } from '@emotion/core'

import { propPathOr, uuid } from '../utils'
import Img from '../components/elements/img'
import Layout from '../components/layout'
import Seo from '../components/seo'

const headingStyles = css`
  ${tw(['font-extrabold', 'text-5xl'])};
`

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

function AbcPage({ data, location }) {
  const pageData = propPathOr(null, ['seo', 'data'], data)
  const pageTitle = propPathOr(null, ['title', 'text'], pageData)
  const pageDescription = propPathOr(null, ['description', 'text'], pageData)
  const pageKeywords = propPathOr(null, ['seokeywords'], pageData)
  const pageImage = propPathOr(null, ['image', 'fb', 'src'], pageData)
  const pathname = propPathOr('/', ['location', 'pathname'], location)
  const abc = propPathOr([], ['abc', 'edges'], data)

  return (
    <Layout>
      <Seo
        pageTitle={pageTitle}
        pageDescription={pageDescription}
        pageKeywords={pageKeywords}
        pageImage={pageImage}
        pathname={pathname}
      />
      <h1 css={headingStyles}>FHU ABC</h1>
      <div css={wrapperStyles}>
        {abc.map(({ node }) => {
          const uid = propPathOr(null, ['uid'], node)
          const date = propPathOr(null, ['data', 'date'], node)
          const title = propPathOr(null, ['data', 'title', 'text'], node)
          const image = propPathOr(null, ['data', 'image'], node)
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
    </Layout>
  )
}

AbcPage.propTypes = {
  data: PropTypes.shape({
    abc: PropTypes.object,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
}

export default AbcPage

export const PageQuery = graphql`
  query AbcQuery {
    seo: prismicHomepage {
      data {
        title {
          text
        }
        description {
          text
        }
        seokeywords
        image {
          thumbnails {
            fb {
              url
            }
          }
        }
      }
    }
    abc: allPrismicText(
      filter: { tags: { regex: "/abc/i" } }
      sort: { fields: [data___date], order: DESC }
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
              url
              fluid(maxWidth: 1920) {
                ...GatsbyPrismicImageFluid_noBase64
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
`
