/* global tw */
import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import uuid from 'uuid/v4'
import { map, propPathOr } from 'crocks'

import { FlexBox } from '../elements/boxs'
import MenuChapters from './menu-levels'
import { Content } from '../elements/shared'

const valueStyles = css`
  ${tw(['font-extrabold', 'text-2xl'])};
`

function MenuVolumes({ items }) {
  if (!items) return null

  return (
    <>
      {map(({ data, uid }) => {
        const title = propPathOr(null, ['title', 'text'], data)
        const chapterItems = propPathOr(null, ['body', 0, 'items'], data)

        return (
          <FlexBox key={uuid()} to={`/${uid}`}>
            <Content css={valueStyles}>{title}</Content>
            <MenuChapters items={chapterItems} />
          </FlexBox>
        )
      }, items)}
    </>
  )
}

MenuVolumes.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
}

MenuVolumes.defaultProps = {
  items: null,
}

export default MenuVolumes
