/* global tw */
import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import uuid from 'uuid/v4'
import { map, propPathOr } from 'crocks'

import { FlexBox } from '../elements/boxs'
import MenuChapters from './menu-levels'
import { TextContent } from '../elements/shared'
import { Appeared } from '../elements/posed'
import { withOpener } from '../elements/recomposed'

const valueStyles = css`
  ${tw(['font-extrabold', 'text-2xl'])};
`

function MenuVolumes({ isVisible, items, toggle }) {
  if (!items) return null

  return (
    <>
      {map(({ data, uid }) => {
        const title = propPathOr(null, ['title', 'text'], data)
        const chapterItems = propPathOr(null, ['body', 0, 'items'], data)

        return (
          <FlexBox key={uuid()} to={`/${uid}`}>
            <TextContent
              key={uuid()}
              css={valueStyles}
              onClick={() => toggle(uid)}
            >
              {title}
            </TextContent>
            <Appeared key={uuid()} pose={isVisible[uid] ? 'visible' : 'hidden'}>
              <MenuChapters key={uuid()} items={chapterItems} />
            </Appeared>
          </FlexBox>
        )
      }, items)}
    </>
  )
}

MenuVolumes.propTypes = {
  isVisible: PropTypes.objectOf(PropTypes.bool).isRequired,
  items: PropTypes.arrayOf(PropTypes.object),
  toggle: PropTypes.func.isRequired,
}

MenuVolumes.defaultProps = {
  items: null,
}

export default withOpener(MenuVolumes)
