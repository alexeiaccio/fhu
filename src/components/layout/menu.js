/* global tw */
/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import { compose, equals, filter, map, omit, propPathOr } from 'crocks'
import uuid from 'uuid/v4'

import MenuValues from './menu-volumes'
import { Column, FlexBox } from '../elements/boxes'
import { TextContent } from '../elements/shared'
import Appeared from '../elements/appeared'
import { withOpener } from '../elements/recomposed'

const menuQuery = graphql`
  query {
    mainmenu: allPrismicHomepageBodyMenu {
      edges {
        node {
          primary {
            menuid
          }
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

const valueStyles = css`
  ${tw(['capitalize', 'font-extrabold'])};
`

function Menu({ isVisible, location, toggle }) {
  return (
    <StaticQuery
      query={menuQuery}
      render={data => {
        const menu = propPathOr(null, ['mainmenu', 'edges'], data)

        return (
          <Nav
            css={css`
              ${tw(['flex', 'text-lg'])};
              flex: 0 1 auto;
            `}
          >
            {map(({ node }) => {
              const menuId = propPathOr(null, ['primary', 'menuid'], node)
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

              if (equals(menuId, 'sessions')) {
                return (
                  <FlexBox key={uuid()}>
                    <TextContent
                      key={uuid()}
                      css={valueStyles}
                      onClick={() => toggle(menuId)}
                    >
                      {menuId}
                    </TextContent>
                    <Appeared key={uuid()} isVisible={isVisible[menuId]}>
                      <MenuValues
                        key={uuid()}
                        items={valumesItems}
                        location={location}
                      />
                    </Appeared>
                  </FlexBox>
                )
              }

              return (
                <MenuValues
                  key={uuid()}
                  items={valumesItems}
                  location={location}
                />
              )
            }, menu)}
          </Nav>
        )
      }}
    />
  )
}

Menu.propTypes = {
  isVisible: PropTypes.objectOf(PropTypes.bool).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  toggle: PropTypes.func.isRequired,
}

export default withOpener(Menu)
