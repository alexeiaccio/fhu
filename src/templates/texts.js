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
          fluid(maxWidth: 1920) {
            ...GatsbyPrismicImageFluid_noBase64
          }
          thumbnails {
            fb {
              url
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
                fluid(maxWidth: 1920) {
                  ...GatsbyPrismicImageFluid
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
                raw
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
              fluid(maxWidth: 600) {
                ...GatsbyPrismicImageFluid
              }
            }
            body {
              ... on PrismicTextBodyPeople {
                id
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
