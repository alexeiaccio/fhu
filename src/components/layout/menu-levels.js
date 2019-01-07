import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import { navigate } from 'gatsby'

import { equals, propPathOr, uuid } from '../../utils'
import Appeared from './appeared'
import Content from './content'
import Outlined from './outlined'
import { Consumer } from './context'

const rowStyles = css`
  ${tw(['flex', 'flex-row', 'flex-wrap', 'max-w-full'])};
  flex: 1 0 auto;
`

const chapterStyles = css`
  ${tw(['font-extrabold', 'truncate'])};
`

const textStyles = css`
  ${tw(['font-semibold', 'italic', 'truncate'])};
`

function MenuLevels({ isVisible, items, toggle, toggleMenu }) {
  if (!items) return null

  return items.map(({ link }) => {
    const document = propPathOr(null, ['document', 0], link)
    const type = equals('chapter', propPathOr(null, ['type'], document))
    const uid = propPathOr(null, ['uid'], document)
    const data = propPathOr(null, ['data'], document)
    const title = propPathOr(null, ['title', 'text'], data)
    const nextLevelItems = propPathOr(null, ['body', 0, 'items'], data)

    return (
      <Outlined css={rowStyles} key={uuid()}>
        <Content
          css={type ? chapterStyles : textStyles}
          onClick={() => {
            if (type) {
              if (toggle) {
                toggle(uid, 'chapter')
              }
            } else {
              navigate(uid)
              toggle(null, 'base')
              if (toggleMenu) {
                toggleMenu(false)
              }
            }
          }}
        >
          {title}
        </Content>
        <Appeared isVisible={!!isVisible[uid]} key={uuid()}>
          <Consumer key={uuid()}>
            {({
              isVisible: isLevelsVisible,
              toggle: levelsToggle,
              toggleMenu: levelsToggleMenu,
            }) => (
              <MenuLevels
                items={nextLevelItems}
                isVisible={isLevelsVisible}
                toggle={levelsToggle}
                toggleMenu={levelsToggleMenu}
              />
            )}
          </Consumer>
        </Appeared>
      </Outlined>
    )
  })
}

MenuLevels.propTypes = {
  isVisible: PropTypes.objectOf(PropTypes.any).isRequired,
  items: PropTypes.arrayOf(PropTypes.object),
  toggle: PropTypes.func.isRequired,
  toggleMenu: PropTypes.func.isRequired,
}

MenuLevels.defaultProps = {
  items: null,
}

export default MenuLevels
