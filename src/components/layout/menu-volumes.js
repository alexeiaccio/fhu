import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { navigate } from 'gatsby'
import PropTypes from 'prop-types'
import React, { useContext } from 'react'
import { propPathOr } from '../../utils'
import Appeared from './appeared'
import Content from './content'
import { MenuContext } from './context'
import { hover, hovered, inHoverStyles } from './hovered'
import MenuLevels from './menu-levels'
import News from './news'
import Outlined from './outlined'

const OutlinedRow = styled(Outlined)`
  ${tw(['flex', 'flex-row', 'flex-wrap', 'max-w-full', 'p-0'])};
  ${hovered};
  flex: 1 0 auto;
`

const volumeStyles = css`
  ${tw(['font-extrabold'])};
  ${hover};
  flex: 1 0 auto;
`

function MenuVolumes({ isVisible, items, toggle }) {
  if (!items) return null
  const {
    isVisible: isVolumesVisible,
    toggle: volumesToggle,
    toggleMenu,
  } = useContext(MenuContext)

  return items.map(({ data, uid }) => {
    const title = propPathOr(null, ['title', 'text'], data)
    const chapterItems = propPathOr(null, ['body', 0, 'items'], data)

    if (uid === 'news') {
      return <News key={uid} />
    }
    if (!chapterItems) {
      return (
        <OutlinedRow key={uid}>
          <Content css={volumeStyles} onClick={() => navigate(uid)}>
            <span css={inHoverStyles}>{title}</span>
          </Content>
        </OutlinedRow>
      )
    }

    return (
      <OutlinedRow key={uid}>
        <Content css={volumeStyles} onClick={() => toggle(uid, 'volume')}>
          <span css={inHoverStyles}>{title}</span>
        </Content>
        <Appeared isVisible={!!isVisible[uid]}>
          <MenuLevels
            items={chapterItems}
            isVisible={isVolumesVisible}
            toggle={volumesToggle}
            toggleMenu={toggleMenu}
          />
        </Appeared>
      </OutlinedRow>
    )
  })
}

MenuVolumes.propTypes = {
  isVisible: PropTypes.objectOf(PropTypes.any).isRequired,
  items: PropTypes.arrayOf(PropTypes.object),
  toggle: PropTypes.func.isRequired,
}

MenuVolumes.defaultProps = {
  items: null,
}

export default MenuVolumes
