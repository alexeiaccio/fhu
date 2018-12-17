/* global tw */
import { jsx, css } from '@emotion/core' // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import { map, propPathOr } from 'crocks'

import MenuItems from './menu-items'

const menuQuery = graphql`
  query {
    mainmenu: prismicHomepageBodyListOfArticles {
      items {
        menu {
          document {
            __typename
            ... on PrismicVolume {
              id
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
                        id
                        uid
                        data {
                          title {
                            text
                          }
                          body {
                            items {
                              link {
                                document {
                                  id
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
              id
              data {
                title {
                  about: text
                }
                body {
                  __typename
                  ... on PrismicAboutBodyText {
                    id
                    primary {
                      text {
                        html
                      }
                    }
                  }
                  ... on PrismicAboutBodyImage {
                    id
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
        // console.log(menuItems)

        return (
          <div
            css={css`
              ${tw(['flex', 'w-1/2'])};
            `}
          >
            <MenuItems items={menuItems} location={location} />
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
