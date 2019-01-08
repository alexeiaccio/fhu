import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import { navigate } from 'gatsby'

import { propPathOr, uuid } from '../../utils'
import Appeared from './appeared'
import Content from './content'
import MenuLevels from './menu-levels'
import News from './news'
import Outlined from './outlined'
import { Consumer } from './context'

const rowStyles = css`
  ${tw(['flex', 'flex-row', 'flex-wrap', 'max-w-full'])};
  flex: 1 0 auto;
`

const volumeStyles = css`
  ${tw(['font-extrabold'])};
`

function MenuVolumes({ isVisible, items, toggle }) {
  if (!items) return null

  return items.map(({ data, uid }) => {
    const title = propPathOr(null, ['title', 'text'], data)
    const chapterItems = propPathOr(null, ['body', 0, 'items'], data)

    if (uid === 'news') {
      return <News key={uuid()} />
    }
    if (!chapterItems) {
      return (
        <Outlined css={rowStyles} key={uuid()}>
          <Content
            key={uuid()}
            css={volumeStyles}
            onClick={() => navigate(uid)}
          >
            {title}
          </Content>
        </Outlined>
      )
    }

    return (
      <Outlined css={rowStyles} key={uuid()}>
        <Content css={volumeStyles} onClick={() => toggle(uid, 'volume')}>
          {title}
        </Content>
        <Appeared isVisible={!!isVisible[uid]} key={uuid()}>
          <Consumer key={uuid()}>
            {({
              isVisible: isVolumesVisible,
              toggle: volumesToggle,
              toggleMenu,
            }) => (
              <MenuLevels
                items={chapterItems}
                isVisible={isVolumesVisible}
                toggle={volumesToggle}
                toggleMenu={toggleMenu}
              />
            )}
          </Consumer>
        </Appeared>
      </Outlined>
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
