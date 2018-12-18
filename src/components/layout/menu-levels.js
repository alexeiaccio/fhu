/* global tw */
/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import PropTypes from 'prop-types'
import uuid from 'uuid/v4'

import { equals, map, propPathOr } from 'crocks'

import { FlexBox, Column } from '../elements/boxs'
import { TextContent } from '../elements/shared'
import { Appeared } from '../elements/posed'
import { withOpener } from '../elements/recomposed'

const chapterStyles = css`
  ${tw(['font-extrabold', 'text-lg'])};
`

const textStyles = css`
  ${tw(['font-semibold', 'italic', 'text-sm', 'truncate'])};
`

function MenuLevels({ isVisible, items, toggle }) {
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
            <TextContent
              css={type ? chapterStyles : textStyles}
              onClick={toggle}
            >
              {title}
            </TextContent>
            <Appeared key={uuid()} pose={isVisible ? 'visible' : 'hidden'}>
              <MenuLevels items={nextLevelItems} />
            </Appeared>
          </FlexBox>
        )
      }, items)}
    </Column>
  )
}

MenuLevels.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  items: PropTypes.arrayOf(PropTypes.object),
  toggle: PropTypes.func.isRequired,
}

MenuLevels.defaultProps = {
  items: null,
}

export default withOpener(MenuLevels)
