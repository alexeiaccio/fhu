import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import TextPage from '../components/blocks/text-page'

function TextsPage({ data, location }) {
  return <TextPage data={data} location={location} />
}

TextsPage.propTypes = {
  data: PropTypes.shape({
    texts: PropTypes.object.isRequired,
    people: PropTypes.object.isRequired,
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
