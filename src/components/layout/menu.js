import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { graphql, StaticQuery } from 'gatsby'
import PropTypes from 'prop-types'
import React, { useContext } from 'react'
import { compose, equals, filter, map, omit, propPathOr } from '../../utils'
import Appeared from './appeared'
import Content from './content'
import { MenuContext } from './context'
import { hover, hovered, inHoverStyles } from './hovered'
import MenuVolumes from './menu-volumes'
import Outlined from './outlined'

const navStyles = css`
  ${tw([
    'flex',
    'flex-col',
    'flex-grow',
    'flex-no-shrink',
    'text-lg',
    'md:flex-no-grow',
    'md:flex-shrink',
  ])};
  flex-basis: auto;
`

const OutlinedRow = styled(Outlined)`
  ${tw(['flex', 'flex-row', 'flex-wrap', 'max-w-full', 'p-0'])};
  ${hovered};
`

const valueStyles = css`
  ${tw(['capitalize', 'font-extrabold'])};
  ${hover};
  &::after {
    content: '';
    ${tw('absolute', 'pin')};
  }
`

function Menu({ data, isVisible, toggle }) {
  const menu = propPathOr(null, ['mainmenu', 'edges'], data)
  const { isVisible: isVolumesVisible, toggle: volumesToggle } = useContext(
    MenuContext
  )

  return (
    <nav css={navStyles}>
      {map(({ node }, idx) => {
        const menuId = propPathOr(null, ['primary', 'menuid'], node)
        const items = propPathOr(null, ['items'], node)
        const menuItems = map(propPathOr(null, ['menu', 'document']), items)
        const volumesItems = compose(
          map(omit(['__typename'])),
          filter(item =>
            equals('PrismicVolume', propPathOr(false, ['__typename'], item))
          )
        )(menuItems)

        if (equals(menuId, 'sessions')) {
          return (
            <OutlinedRow key={`${menuId}-${idx}`}>
              <Content
                css={valueStyles}
                onClick={() => toggle(menuId, 'volume')}
              >
                <span css={inHoverStyles}>{menuId}</span>
              </Content>
              <Appeared
                isVisible={!!isVisible[menuId]}
                key={`${menuId}-${idx}-appeared`}
              >
                <MenuVolumes
                  items={volumesItems}
                  isVisible={isVolumesVisible}
                  toggle={volumesToggle}
                />
              </Appeared>
            </OutlinedRow>
          )
        }

        return (
          <MenuVolumes
            items={volumesItems}
            key={`${menuId}-${idx}-volumes`}
            isVisible={isVolumesVisible}
            toggle={volumesToggle}
          />
        )
      }, menu)}
    </nav>
  )
}

Menu.propTypes = {
  isVisible: PropTypes.objectOf(PropTypes.any).isRequired,
  data: PropTypes.objectOf(PropTypes.object).isRequired,
  toggle: PropTypes.func.isRequired,
}

const withStaticQuery = props => (
  <StaticQuery
    query={graphql`
      query {
        mainmenu: allPrismicHomepageBodyMenu(
          filter: { primary: { menuid: { ne: "links" } } }
        ) {
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
                          fluid(maxWidth: 1200) {
                            ...GatsbyPrismicImageFluid
                          }
                        }
                        body {
                          ... on PrismicVolumeBodyChapters {
                            items {
                              link {
                                document {
                                  ... on PrismicChapter {
                                    type
                                    uid
                                    data {
                                      title {
                                        text
                                      }
                                      body {
                                        ... on PrismicChapterBodyListOfArticles {
                                          items {
                                            link {
                                              document {
                                                ... on PrismicText {
                                                  type
                                                  uid
                                                  data {
                                                    title {
                                                      text
                                                    }
                                                    image {
                                                      fluid(maxWidth: 1200) {
                                                        ...GatsbyPrismicImageFluid
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
    `}
    render={data => <Menu data={data} {...props} />}
  />
)

export default withStaticQuery
