/* global tw */
/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import { compose, equals, filter, map, omit, propPathOr } from 'crocks'

import MenuValues from './menu-values'

const menuQuery = graphql`
  query {
    mainmenu: prismicHomepageBodyListOfArticles {
      items {
        menu {
          document {
            __typename
            ... on PrismicVolume {
              uid
              data {
                title {
                  text
                }
                image {
                  localFile {
                    childImageSharp {
                      fluid(maxWidth: 1200, jpegProgressive: true) {
                        ...GatsbyImageSharpFluid
                      }
                    }
                  }
                }
                body {
                  items {
                    link {
                      document {
                        uid
                        data {
                          title {
                            text
                          }
                          body {
                            items {
                              link {
                                document {
                                  uid
                                  data {
                                    title {
                                      text
                                    }
                                    image {
                                      localFile {
                                        childImageSharp {
                                          fluid(
                                            maxWidth: 1200
                                            jpegProgressive: true
                                          ) {
                                            ...GatsbyImageSharpFluid
                                          }
                                        }
                                      }
                                    }
                                    body {
                                      __typename
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
                  __typename
                }
              }
            }
            ... on PrismicAbout {
              data {
                title {
                  about: text
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
                        localFile {
                          childImageSharp {
                            fluid(maxWidth: 600, jpegProgressive: true) {
                              ...GatsbyImageSharpFluid
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
`

function Menu({ location }) {
  return (
    <StaticQuery
      query={menuQuery}
      render={data => {
        const menu = propPathOr(null, ['mainmenu', 'items'], data)
        const menuItems = map(propPathOr(null, ['menu', 'document', 0]), menu)
        const valuesItems = compose(
          map(omit(['__typename'])),
          filter(item =>
            equals('PrismicVolume', propPathOr(false, ['__typename'], item))
          )
        )(menuItems)

        return (
          <div
            css={css`
              ${tw(['flex', 'w-1/2'])};
            `}
          >
            <MenuValues items={valuesItems} location={location} />
          </div>
        )
      }}
    />
  )
}

Menu.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
}

export default Menu
