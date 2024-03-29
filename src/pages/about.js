import { css } from '@emotion/core'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import React, { Fragment, useState } from 'react'
import Img from '../components/elements/img'
import RichContent from '../components/elements/rich-content'
import { RichText } from '../components/elements/rich-text'
import Layout from '../components/layout'
import Seo from '../components/seo'
import { equals, map, propPathOr, uuid } from '../utils'

const headingStyles = css`
  ${tw(['font-extrabold', 'mb-q24', 'text-5xl'])};
`

const sectionStyles = css`
  ${tw(['py-q24', 'max-w-md', 'w-full'])};
  margin: 0 auto;
`

const logoStyles = css`
  ${sectionStyles};
  ${tw(['flex', 'flex-row', 'flex-no-wrap', 'items-center'])};
  & .logo {
    ${tw(['w-1/2'])};
  }
`

const textStyles = css`
  ${RichText};
  ${tw(['mb-q24'])};
`

function AboutPage({ data, location }) {
  const about = propPathOr(null, ['about', 'data'], data)
  const title = propPathOr(null, ['title', 'text'], about)
  const imgSrc = propPathOr(null, ['image'], about)
  const description = propPathOr(null, ['description', 'text'], about)
  const keywords = propPathOr(null, ['seokeywords'], about)
  const pageImage = propPathOr(null, ['image', 'fb', 'src'], about)
  const pathname = propPathOr('/', ['location', 'pathname'], location)
  const body = propPathOr([], ['body'], about)
  const [keys] = useState(() => Array.from(body, () => uuid()))

  return (
    <Layout>
      <Seo
        pageTitle={title}
        pageDescription={description}
        pageKeywords={keywords}
        pageImage={pageImage}
        pathname={pathname}
      />
      <h1 css={headingStyles}>{title}</h1>
      <Img src={imgSrc} />
      <section css={sectionStyles}>
        {map(({ __typename, primary }, idx) => {
          const textContent = propPathOr(null, ['text', 'html'], primary)

          return (
            <Fragment key={keys[idx]}>
              {equals(__typename, 'PrismicAboutBodyText') && (
                <RichContent content={textContent} css={textStyles} />
              )}
            </Fragment>
          )
        }, body)}
      </section>
      <section css={logoStyles}>
        {map(
          ({ __typename, items }, i) => (
            <Fragment key={`${keys[i]}-image`}>
              {equals(__typename, 'PrismicAboutBodyImage') && (
                <>
                  {items.map(src =>
                    src ? (
                      <Img
                        className="logo"
                        key={src.imagesrc.url}
                        src={src.imagesrc}
                      />
                    ) : null
                  )}
                </>
              )}
            </Fragment>
          ),
          body
        )}
      </section>
    </Layout>
  )
}

AboutPage.propTypes = {
  data: PropTypes.shape({
    about: PropTypes.object.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
}

export default AboutPage

export const PageQuery = graphql`
  query AboutQuery {
    about: prismicAbout {
      data {
        title {
          text
        }
        description {
          text
        }
        seokeywords
        image {
          fluid(maxWidth: 1920) {
            ...GatsbyPrismicImageFluid
          }
          thumbnails {
            fb {
              url
            }
          }
        }
        body {
          __typename
          ... on PrismicAboutBodyText {
            primary {
              text {
                html
              }
            }
          }
          ... on PrismicAboutBodyImage {
            items {
              imagesrc {
                url
                fluid(maxWidth: 600) {
                  ...GatsbyPrismicImageFluid_noBase64
                }
              }
            }
          }
        }
      }
    }
  }
`
