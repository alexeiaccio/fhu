import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'

import { propPathOr } from '../utils'
import Layout from '../components/layout'
import OtherNews from '../components/blocks/other-news'
import Seo from '../components/seo'
import Subscribe from '../components/blocks/subscribe'

const headingStyles = css`
  ${tw(['font-extrabold', 'text-5xl'])};
`

function ArchivePage({ data, location }) {
  const pageData = propPathOr(null, ['seo', 'data'], data)
  const pageTitle = propPathOr(null, ['title', 'text'], pageData)
  const pageDescription = propPathOr(null, ['description', 'text'], pageData)
  const pageKeywords = propPathOr(null, ['seokeywords'], pageData)
  const pageImage = propPathOr(null, ['image', 'fb', 'src'], pageData)
  const pathname = propPathOr('/', ['pathname'], location)
  const news = propPathOr({ edges: [] }, ['news'], data)

  return (
    <Layout>
      <Seo
        pageTitle={pageTitle}
        pageDescription={pageDescription}
        pageKeywords={pageKeywords}
        pageImage={pageImage}
        pathname={pathname}
      />
      <h1 css={headingStyles}>News Archive</h1>
      <OtherNews news={news} pathname={pathname} all />
      <Subscribe />
    </Layout>
  )
}

ArchivePage.propTypes = {
  data: PropTypes.shape({
    news: PropTypes.object,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
}

export default ArchivePage

export const PageQuery = graphql`
  query ArchiveQuery {
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
    news: allPrismicText(
      filter: { tags: { regex: "/news/i" } }
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
              fluid(maxWidth: 1920) {
                ...GatsbyPrismicImageFluid
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
