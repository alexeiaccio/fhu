/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { StaticQuery, Link, graphql } from 'gatsby'
import styled from '@emotion/styled'

import { propPathOr } from '../../utils'
import { Box } from '../elements/boxes'
import { Outlined } from '../elements/shared'
import Img from '../elements/img'

const query = graphql`
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
`

const Container = styled.div`
  ${Box};
  ${Outlined};
  ${tw(['bg-white', 'p-q12', 'relative', 'md:p-q24'])};
  box-sizing: border-box;
`

const titleStyles = css`
  ${tw(['block', 'font-extrabold', 'my-q12'])};
`

const dateStyles = css`
  ${tw(['italic', 'mt-q12', 'text-right', 'text-xs'])};
`

const descStyles = css`
  ${tw(['text-sm'])};
`

function News() {
  return (
    <StaticQuery
      query={query}
      render={({ news }) => {
        const newsNode = propPathOr(null, ['edges', 0, 'node'], news)
        const uid = propPathOr(null, ['uid'], newsNode)
        const date = propPathOr(null, ['data', 'date'], newsNode)
        const image = propPathOr(null, ['data', 'image', 'full'], newsNode)
        const title = propPathOr(
          'News',
          ['data', 'title', 'text'],
          newsNode
        ).slice(0, 36)
        const description = propPathOr(
          '',
          ['data', 'description', 'text'],
          newsNode
        ).slice(0, 64)

        return (
          <Container>
            <Img src={image} />
            <Link css={titleStyles} to={uid}>
              {title}
            </Link>
            <div css={descStyles}>{description}...</div>
            <div css={dateStyles}>{date}</div>
          </Container>
        )
      }}
    />
  )
}

export default News
