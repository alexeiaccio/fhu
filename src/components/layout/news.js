import React from 'react'
import { StaticQuery, Link, graphql } from 'gatsby'
import styled from '@emotion/styled'
import { propPathOr } from 'crocks'

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
              url
              localFile {
                childImageSharp {
                  fluid(maxWidth: 300, jpegProgressive: true) {
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
`

const Container = styled.div`
  ${Box};
  ${Outlined};
  ${tw(['p-q12', 'relative', 'md:p-q24'])};
  box-sizing: border-box;
`

const Title = styled(Link)`
  ${tw(['block', 'font-extrabold', 'my-q12'])};
`

const Date = styled.div`
  ${tw(['italic', 'mt-q12', 'text-right', 'text-xs'])};
`

const Desc = styled.div`
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
        const image = propPathOr(null, ['data', 'image'], newsNode)
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
            <Title to={uid}>{title}</Title>
            <Desc>{description}...</Desc>
            <Date>{date}</Date>
          </Container>
        )
      }}
    />
  )
}

export default News
