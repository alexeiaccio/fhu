/* global tw */
/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import PropTypes from 'prop-types'
import uuid from 'uuid/v4'
import { map, propPathOr } from 'crocks'

import { FlexBox } from '../elements/boxs'
import MenuChapters from './menu-levels'
import { MenuItemContent } from '../elements/shared'

const Item = FlexBox.withComponent('li')

function MenuValues({ items }) {
  if (!items) return null

  return (
    <nav>
      <ul
        css={css`
          ${tw(['flex', 'max-w-1/2'])};
        `}
      >
        {map(({ data, uid }) => {
          const title = propPathOr(null, ['title', 'text'], data)
          const chapterItems = propPathOr(null, ['body', 0, 'items'], data)

          return (
            <Item key={uuid()} to={`/${uid}`}>
              <MenuItemContent>{title}</MenuItemContent>
              <MenuChapters items={chapterItems} />
            </Item>
          )
        }, items)}
      </ul>
    </nav>
  )
}

MenuValues.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
}

MenuValues.defaultProps = {
  items: null,
}

export default MenuValues
