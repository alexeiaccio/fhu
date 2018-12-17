/** @jsx jsx */
import { jsx } from '@emotion/core'
import PropTypes from 'prop-types'
import uuid from 'uuid/v4'
import { map, propPathOr } from 'crocks'

import { FlexBox, Column } from '../elements/boxs'
import { MenuItemContent } from '../elements/shared'

function MenuLevels({ items }) {
  if (!items) return null

  return (
    <Column>
      {map(({ link }) => {
        const data = propPathOr(null, ['document', 0, 'data'], link)
        const title = propPathOr(null, ['title', 'text'], data)
        const uid = propPathOr(null, ['uid'], data)
        const nextLevelItems = propPathOr(null, ['body', 0, 'items'], data)

        return (
          <FlexBox key={uuid()} to={`/${uid}`}>
            <MenuItemContent>{title}</MenuItemContent>
            <MenuLevels items={nextLevelItems} />
          </FlexBox>
        )
      }, items)}
    </Column>
  )
}

MenuLevels.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
}

MenuLevels.defaultProps = {
  items: null,
}

export default MenuLevels
