import React from 'react'
import PropTypes from 'prop-types'
import uuid from 'uuid/v4'
import { map, propPathOr } from 'crocks'

import { FlexBox } from '../elements/boxs'
import MenuChapters from './menu-levels'
import { MenuItemContent } from '../elements/shared'

function MenuValues({ items }) {
  if (!items) return null

  return (
    <>
      {map(({ data, uid }) => {
        const title = propPathOr(null, ['title', 'text'], data)
        const chapterItems = propPathOr(null, ['body', 0, 'items'], data)

        return (
          <FlexBox key={uuid()} to={`/${uid}`}>
            <MenuItemContent>{title}</MenuItemContent>
            <MenuChapters items={chapterItems} />
          </FlexBox>
        )
      }, items)}
    </>
  )
}

MenuValues.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
}

MenuValues.defaultProps = {
  items: null,
}

export default MenuValues
