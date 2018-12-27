import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import { propPathOr } from 'crocks'
import styled from '@emotion/styled'
import uuid from 'uuid/v4'

import Img from '../components/elements/img'

const H1 = styled.h1`
  ${tw(['font-extrabold', 'text-5xxl'])};
`

const Wrapper = styled.ul`
  ${tw(['flex', 'flex-row', 'flex-wrap'])};
  margin: 0.75rem -1rem 0;
`

const Li = styled.li`
  ${tw(['flex', 'flex-1', 'max-w-1/2', 'px-q8', 'py-1'])};
`
const StyledLink = styled(Link)`
  ${tw(['w-full'])};
`
const Card = styled.div`
  ${tw(['p-q8'])};
  box-sizing: border-box;
`

const H2 = styled.h2`
  ${tw(['font-semibold', 'mt-q12', 'text-xxl'])};
`

const Date = styled.div`
  ${tw(['italic', 'my-q12', 'text-right', 'text-xs'])};
`

const Desc = styled.div`
  ${tw(['mt-q12', 'text-sm'])};
`

function ArchivePage({ data }) {
  const news = propPathOr(null, ['news', 'edges'], data)

  return (
    <>
      <H1>Archive</H1>
      <Wrapper>
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
            <Li key={uuid()}>
              {uid && (
                <StyledLink to={`/${uid}`}>
                  <Card>
                    <Img src={image} />
                    <H2>{title}</H2>
                    <Date>{date}</Date>
                    <Desc>{description}</Desc>
                  </Card>
                </StyledLink>
              )}
            </Li>
          )
        })}
      </Wrapper>
    </>
  )
}

ArchivePage.propTypes = {
  data: PropTypes.shape({
    news: PropTypes.object.isRequired,
  }).isRequired,
}

export default ArchivePage

export const PageQuery = graphql`
  query ArchiveQuery {
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
