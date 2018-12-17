/* global tw */
/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import PropTypes from 'prop-types'
import uuid from 'uuid/v4'

import { equals, map, propPathOr } from 'crocks'

import { FlexBox, Column } from '../elements/boxs'
import { Content } from '../elements/shared'

const chapterStyles = css`
  ${tw(['font-semibold', 'text-lg'])};
`

const textStyles = css`
  ${tw(['font-normal', 'italic', 'text-sm', 'truncate'])};
`

function MenuLevels({ items }) {
  if (!items) return null

  return (
    <Column>
      {map(({ link }) => {
        const document = propPathOr(null, ['document', 0], link)
        const type = equals('chapter', propPathOr(null, ['type'], document))
        const data = propPathOr(null, ['data'], document)
        const title = propPathOr(null, ['title', 'text'], data)
        const uid = propPathOr(null, ['uid'], data)
        const nextLevelItems = propPathOr(null, ['body', 0, 'items'], data)

        return (
          <FlexBox key={uuid()} to={`/${uid}`}>
            <Content css={type ? chapterStyles : textStyles}>{title}</Content>
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
