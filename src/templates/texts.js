import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'

import { compose, chain, filter, map, propPathOr } from '../utils'
import Img from '../components/elements/img'
import Layout from '../components/layout'
import Related from '../components/elements/related'
import RichContent from '../components/elements/rich-content'
import Seo from '../components/seo'
import Tags from '../components/elements/tags'
import TextBody from '../components/blocks/text-body'

function TextsPage({ data, location }) {
  const pageData = propPathOr(null, ['texts', 'data'], data)
  const pageTitle = propPathOr(null, ['title', 'text'], pageData)
  const pageDescription = propPathOr(null, ['description', 'text'], pageData)
  const pageKeywords = propPathOr(null, ['seokeywords'], pageData)
  const pageImage = propPathOr(
    null,
    ['image', 'fb', 'localFile', 'childImageSharp', 'fixed', 'src'],
    pageData
  )
  const pathname = propPathOr('/', ['location', 'pathname'], location)
  const textsUid = propPathOr(null, ['texts', 'uid'], data)
  const texts = propPathOr(null, ['texts', 'data'], data)
  const tags = propPathOr(null, ['texts', 'tags'], data)
  const imgSrc = propPathOr(null, ['image'], texts)
  const title = propPathOr(null, ['title', 'html'], texts)
  const body = propPathOr(null, ['body'], texts)

  const people = propPathOr(null, ['people', 'edges'], data)
  const peopleNode = map(propPathOr(null, ['node']), people)
  const filterPeople = compose(
    chain(map(propPathOr(null, ['prismicId']))),
    map(
      filter(node => {
        const items = propPathOr([], ['items'], node)
        return items.some(
          item => propPathOr(null, ['link', 'uid'], item) === textsUid
        )
      })
    ),
    map(propPathOr(null, ['node', 'data', 'body']))
  )
  const relatedTexts = filter(
    item =>
      filterPeople(people).some(
        x => x && x.includes(propPathOr('', ['id'], item))
      ),
    peopleNode
  )

  return (
    <Layout>
      <Seo
        pageTitle={pageTitle}
        pageDescription={pageDescription}
        pageKeywords={pageKeywords}
        pageImage={pageImage}
        pathname={pathname}
      />
      <article>
        <RichContent
          css={css`
            & h1 {
              ${tw([
                'break-words',
                'font-extrabold',
                'mb-q24',
                'mt-q24',
                'text-5xl',
              ])}
            }
          `}
          content={title}
        />
        <div
          css={css`
            ${tw(['absolute', 'm-q12', 'pin-r', 'pin-t', 'z-10'])}
          `}
        >
          <Tags tags={tags} />
        </div>
        <div
          css={css`
            ${tw(['max-w-md', 'mx-auto'])};
          `}
        >
          <Img src={imgSrc} />
        </div>
        <TextBody body={body} />
      </article>
      <aside
        css={css`
          ${tw(['pb-q24', 'w-full'])};
          margin: 0 auto;
          max-width: 40rem;
        `}
      >
        <Related items={relatedTexts} />
      </aside>
    </Layout>
  )
}

TextsPage.propTypes = {
  data: PropTypes.shape({
    texts: PropTypes.object.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
}

export default TextsPage

export const PageQuery = graphql`
  query TextsQuery($uid: String!) {
    texts: prismicText(uid: { eq: $uid }) {
      uid
      tags
      data {
        title {
          html
          text
        }
        description {
          text
        }
        seokeywords
        image {
          url
          localFile {
            childImageSharp {
              fluid(maxWidth: 1600, jpegProgressive: true) {
                ...GatsbyImageSharpFluid_noBase64
              }
            }
          }
          fb {
            url
            localFile {
              childImageSharp {
                fixed(width: 1200, height: 628) {
                  src
                }
              }
            }
          }
        }
        body {
          __typename
          ... on PrismicTextBodyPeople {
            items {
              link {
                document {
                  uid
                  data {
                    title {
                      text
                    }
                  }
                }
              }
            }
          }
          ... on PrismicTextBodyDescription {
            primary {
              text {
                html
              }
            }
          }
          ... on PrismicTextBodyLead {
            primary {
              text {
                html
              }
            }
          }
          ... on PrismicTextBodyText {
            primary {
              text {
                html
              }
            }
          }
          ... on PrismicTextBodyRighted {
            primary {
              text {
                html
              }
            }
          }
          ... on PrismicTextBodyCentered {
            primary {
              text {
                html
              }
            }
          }
          ... on PrismicTextBodyImage {
            items {
              imagesrc {
                url
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 1200, jpegProgressive: true) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
              caption {
                html
              }
            }
          }
          ... on PrismicTextBodyMedia {
            items {
              link {
                link_type
                name
                url
                size
              }
            }
          }
          ... on PrismicTextBodyVideo {
            primary {
              link {
                html
              }
            }
          }
          ... on PrismicTextBodyRelated {
            items {
              link {
                document {
                  uid
                  data {
                    title {
                      text
                    }
                    image {
                      url
                      localFile {
                        childImageSharp {
                          fluid(maxWidth: 600, jpegProgressive: true) {
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
        }
      }
    }
    people: allPrismicText(
      filter: {
        data: { body: { elemMatch: { slice_type: { eq: "people" } } } }
      }
    ) {
      edges {
        node {
          id
          uid
          data {
            title {
              text
            }
            image {
              url
              localFile {
                childImageSharp {
                  fluid(maxWidth: 600, jpegProgressive: true) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
            body {
              ... on PrismicTextBodyPeople {
                prismicId
                items {
                  link {
                    uid
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
