/* global tw */
/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import { compose, equals, filter, map, omit, propPathOr } from 'crocks'
import uuid from 'uuid/v4'

import MenuValues from './menu-volumes'
import { Column, FlexBox } from '../elements/boxes'
import { TextContent, MobileContainer } from '../elements/shared'
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

function Menu({ isMenu, isVisible, location, toggle, toggleMenu }) {
  return (
    <StaticQuery
      query={menuQuery}
      render={data => {
        const menu = propPathOr(null, ['mainmenu', 'edges'], data)

        const renderMenuContent = () => (
          <Nav
            css={css`
              ${tw([
                'flex',
                'text-lg',
                'flex-grow',
                'flex-no-shrink',
                'min-h-full',
                'md:flex-no-grow',
                'md:flex-shrink',
              ])};
              flex-basis: auto;
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

        return (
          <div
            css={css`
              ${tw(['md:overflow-y-auto'])};
              margin-bottom: 2px;
            `}
          >
            <MobileContainer
              css={css`
                ${isMenu && tw(['fixed', 'p-q8', 'pin', 'z-50'])};
              `}
            >
              <Appeared key={uuid()} isVisible={isMenu}>
                <div
                  css={css`
                    ${tw(['h-full', 'overflow-y-auto', 'w-full'])};
                    margin-bottom: 2px;
                  `}
                >
                  {renderMenuContent()}
                </div>
              </Appeared>
              <FlexBox
                css={css`
                  ${tw(['flex', 'flex-col', 'flex-no-grow'])};
                `}
                onClick={() => toggleMenu(!isMenu)}
              >
                <FlexBox>
                  <TextContent css={valueStyles}>S</TextContent>
                </FlexBox>
                {map(({ node }) => {
                  const menuId = propPathOr(null, ['primary', 'menuid'], node)
                  const items = propPathOr(null, ['items'], node)
                  const menuItems = map(
                    propPathOr(null, [
                      'menu',
                      'document',
                      0,
                      'data',
                      'title',
                      'text',
                      0,
                    ]),
                    items
                  )
                  if (!equals(menuId, 'sessions')) {
                    return map(
                      letter =>
                        letter ? (
                          <FlexBox key={uuid()}>
                            <TextContent key={uuid()} css={valueStyles}>
                              {letter}
                            </TextContent>
                          </FlexBox>
                        ) : null,
                      menuItems
                    )
                  }
                  return null
                }, menu)}
              </FlexBox>
            </MobileContainer>
            <div
              css={css`
                ${tw(['hidden', 'md:block'])};
              `}
            >
              {renderMenuContent()}
            </div>
          </div>
        )
      }}
    />
  )
}

Menu.propTypes = {
  isVisible: PropTypes.objectOf(PropTypes.bool).isRequired,
  isMenu: PropTypes.bool.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  toggle: PropTypes.func.isRequired,
  toggleMenu: PropTypes.func.isRequired,
}

export default withOpener(Menu)
