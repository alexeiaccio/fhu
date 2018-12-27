import React from 'react'
import { StaticQuery, Link, graphql } from 'gatsby'
import styled from '@emotion/styled'
import { map, propPathOr } from 'crocks'
import uuid from 'uuid/v4'

import { Box, Hovered } from '../elements/boxes'
import { Outlined } from '../elements/shared'
import Img from '../elements/img'

const query = graphql`
  {
    about: prismicAbout {
      data {
        title {
          text
        }
        image {
          full {
            url
          }
        }
        description {
          text
        }
        body {
          __typename
          ... on PrismicAboutBodyImage {
            items {
              imagesrc {
                url
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 300, jpegProgressive: true) {
                      ...GatsbyImageSharpFluid_noBase64
                    }
                  }
                }
              }
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

const Title = styled.div`
  ${tw(['block', 'font-extrabold', 'mb-q16'])};
`

const Desc = styled.div`
  ${tw(['my-q16', 'text-sm'])};
`

const StyledLink = styled(Link)`
  ${Outlined};
  ${Hovered};
  ${tw(['inline-block', 'px-q12', 'py-q8'])};
`

const LogoWrapper = styled.div`
  ${tw(['flex', 'flex-row', 'flex-no-wrap', 'items-center', 'mt-q24'])};
  & .logo {
    ${tw(['w-1/2'])};
  }
`

function About() {
  return (
    <StaticQuery
      query={query}
      render={({ about }) => {
        const image = propPathOr(null, ['data', 'image', 'full'], about)
        const title = propPathOr('About', ['data', 'title', 'text'], about)
        const body = propPathOr([], ['data', 'body'], about)
        const logos = map(propPathOr(null, ['items']), body).flat()
        const description = propPathOr(
          '',
          ['data', 'description', 'text'],
          about
        )

        return (
          <Container>
            <Title>{title}</Title>
            <Img src={image} />
            <Desc>{description}</Desc>
            <StyledLink to="/about">More →</StyledLink>
            <LogoWrapper>
              {logos.map(src =>
                src ? (
                  <Img className="logo" key={uuid()} src={src.imagesrc} />
                ) : null
              )}
            </LogoWrapper>
          </Container>
        )
      }}
    />
  )
}

export default About
