import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { StaticQuery, graphql } from 'gatsby'

import {
  compose,
  equals,
  filter,
  map,
  omit,
  propPathOr,
  uuid,
} from '../../utils'
import Appeared from './appeared'
import Content from './content'
import MenuVolumes from './menu-volumes'
import Outlined from './outlined'
import { MenuContext } from './context'
import hovered from './hovered'

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
  &::before {
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
      {map(({ node }) => {
        const menuId = propPathOr(null, ['primary', 'menuid'], node)
        const items = propPathOr(null, ['items'], node)
        const menuItems = map(propPathOr(null, ['menu', 'document', 0]), items)
        const volumesItems = compose(
          map(omit(['__typename'])),
          filter(item =>
            equals('PrismicVolume', propPathOr(false, ['__typename'], item))
          )
        )(menuItems)

        if (equals(menuId, 'sessions')) {
          return (
            <OutlinedRow key={uuid()}>
              <Content
                css={valueStyles}
                onClick={() => toggle(menuId, 'volume')}
              >
                {menuId}
              </Content>
              <Appeared isVisible={!!isVisible[menuId]} key={uuid()}>
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
            key={uuid()}
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
