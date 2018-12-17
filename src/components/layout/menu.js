/* global tw */
/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import { compose, equals, filter, map, omit, propPathOr } from 'crocks'

import MenuValues from './menu-volumes'
import { Column } from '../elements/boxs'

const menuQuery = graphql`
  query {
    mainmenu: allPrismicHomepageBodyMenu {
      edges {
        node {
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
                            type
                            uid
                            data {
                              title {
                                text
                              }
                              body {
                                items {
                                  link {
                                    document {
                                      type
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
    }
  }
`

const Nav = Column.withComponent('nav')

function Menu({ location }) {
  return (
    <StaticQuery
      query={menuQuery}
      render={data => {
        const menu = propPathOr(null, ['mainmenu', 'edges'], data)

        return (
          <Nav
            css={css`
              ${tw(['flex', 'flex-1'])};
            `}
          >
            {map(({ node }) => {
              const items = propPathOr(null, ['items'], node)
              const menuItems = map(
                propPathOr(null, ['menu', 'document', 0]),
                items
              )
              const valumesItems = compose(
                map(omit(['__typename'])),
                filter(item =>
                  equals(
                    'PrismicVolume',
                    propPathOr(false, ['__typename'], item)
                  )
                )
              )(menuItems)
              return <MenuValues items={valumesItems} location={location} />
            }, menu)}
          </Nav>
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
