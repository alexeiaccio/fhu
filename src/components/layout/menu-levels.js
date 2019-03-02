import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { navigate } from 'gatsby'

import { equals, propPathOr, uuid } from '../../utils'
import Appeared from './appeared'
import Content from './content'
import Outlined from './outlined'
import { MenuContext } from './context'
import { hover, hovered, inHoverStyles } from './hovered'

const OutlinedRow = styled(Outlined)`
  ${tw(['flex', 'flex-row', 'flex-wrap', 'max-w-full', 'p-0'])};
  ${hovered};
  flex: 1 0 auto;
`

const chapterStyles = css`
  ${tw(['font-extrabold', 'truncate'])};
  ${hover};
  flex: 1 0 auto;
`

const textStyles = css`
  ${tw(['font-semibold', 'italic', 'truncate'])};
  ${hover};
`

function MenuLevels({ isVisible, items, toggle, toggleMenu }) {
  if (!items) return null
  const {
    isVisible: isLevelsVisible,
    toggle: levelsToggle,
    toggleMenu: levelsToggleMenu,
  } = useContext(MenuContext)

  return items.map(({ link }) => {
    const document = propPathOr(null, ['document', 0], link)
    const type = equals('chapter', propPathOr(null, ['type'], document))
    const uid = propPathOr(null, ['uid'], document)
    const data = propPathOr(null, ['data'], document)
    const title = propPathOr(null, ['title', 'text'], data)
    const nextLevelItems = propPathOr(null, ['body', 0, 'items'], data)

    return (
      <OutlinedRow key={uuid()}>
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
          <span css={inHoverStyles}>{title}</span>
        </Content>
        <Appeared isVisible={!!isVisible[uid]} key={uuid()}>
          <MenuLevels
            items={nextLevelItems}
            isVisible={isLevelsVisible}
            toggle={levelsToggle}
            toggleMenu={levelsToggleMenu}
          />
        </Appeared>
      </OutlinedRow>
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
