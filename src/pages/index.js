import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import { mapProps, propPathOr } from '../utils'
import Layout from '../components/layout'
import Seo from '../components/seo'
import Slider from '../components/blocks/main-slider'
import TextPage from '../components/blocks/text-page'

function IndexPage({ data, location }) {
  const highlights = propPathOr(
    null,
    ['highlights', 'items', 0, 'link', 'document', 0],
    data
  )

  if (highlights) {
    const people = propPathOr(null, ['people'], data)
    const texts = mapProps(
      {
        tags: t => ['Highlights', ...t],
      },
      highlights
    )

    return <TextPage data={{ people, texts }} location={location} />
  }

  const pathname = propPathOr('/', ['location', 'pathname'], location)
  const items = propPathOr(null, ['slider', 'edges', 0, 'node', 'items'], data)
  const pageData = propPathOr(null, ['seo', 'data'], data)
  const pageTitle = propPathOr(null, ['title', 'text'], pageData)
  const pageDescription = propPathOr(null, ['description', 'text'], pageData)
  const pageKeywords = propPathOr(null, ['seokeywords'], pageData)
  const pageImage = propPathOr(
    null,
    ['image', 'fb', 'localFile', 'childImageSharp', 'fixed', 'src'],
    pageData
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
      <Slider items={items} />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    seo: PropTypes.object.isRequired,
    slider: PropTypes.object.isRequired,
    highlights: PropTypes.object.isRequired,
    people: PropTypes.object.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
}

export default IndexPage

export const PageQuery = graphql`
  query IndexQuery {
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
      }
    }
    slider: allPrismicHomepageBodySlider(
      filter: { primary: { sliderid: { eq: "images" } } }
    ) {
      edges {
        node {
          items {
            image {
              localFile {
                childImageSharp {
                  fluid(maxWidth: 1600, jpegProgressive: true) {
                    ...GatsbyImageSharpFluid_noBase64
                  }
                }
              }
            }
            caption {
              html
            }
            link {
              document {
                ... on PrismicText {
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
        }
      }
    }
    highlights: prismicHomepageBodySlider(primary: {sliderid: {eq: "highlights"}}) {
      items {
        link {
          document {
            ... on PrismicText {
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
                          ...on PrismicText {
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
                    slice_label
                    items {
                      imagesrc {
                        url
                        localFile {
                          childImageSharp {
                            fluid(maxWidth: 1920, jpegProgressive: true) {
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
                          ...on PrismicText {
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
            }
          }
        }
      }
    }
    people: allPrismicText(filter: {dataString: {regex: "/slice_type\":\"people/"}}) {
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
